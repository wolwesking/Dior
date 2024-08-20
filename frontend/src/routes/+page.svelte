<script>
  import You from "$lib/You.svelte";
  import Stranger from "$lib/Stranger.svelte";
  import Chat from "$lib/Chat.svelte";
  import { currentUser, pb } from "$lib/pocketbase";
  import LoginSelector from "$lib/LoginSelector.svelte";

  // Global variables
  let strangerStream;
  let myStream;
  let isOnline = false;
  let onlineData;
  let peer;
  let searchInterval;

  // Call related variables
  let isCalling = false;

  async function peerSetUp() {
    // Dynamically import PeerJS
    const { default: PeerJs } = await import("peerjs");
    const Peer = PeerJs;

    // Initialize PeerJS
    if (peer) {
      peer.destroy(); // Cleanup any existing peer instance
    }
    peer = new Peer();
    return peer;
  }

  // User's input
  async function handleStream(event) {
    myStream = event.detail;
    console.log("Received data:", event.detail);

    // Start the peer
    peer = await peerSetUp();
    peer.on("open", (id) => {
      setUserOnline(id);
      startSearch();
    });

    peer.on("close", () => {
      setUserOffline();
    });

    peer.on("call", function (call) {
      if (!isCalling) {
        call.answer(myStream);
        call.on("stream", function (remoteStream) {
          strangerStream = remoteStream;
          const data = {
            isInCall: true,
          };

          try {
            pb.collection("online").update(onlineData.id, data);
          } catch (error) {
            console.error("Error updating call status:", error);
          }
        });
      }
    });
  }

  async function handleStop() {
    strangerStream = "noFeed";
    clearInterval(searchInterval);
    if (peer) {
      peer.destroy();
      peer = null; // Reset peer instance
    }
  }

  function handleSkip() {
    startSearch();
  }

  // Functions
  async function setUserOnline(peerId) {
    let user = pb.authStore.model;
    if (user && user.id) {
      const data = {
        user: user.id,
        peerId: peerId,
        isInCall: false,
      };
      try {
        onlineData = await pb.collection("online").create(data);
        isOnline = true;
      } catch (error) {
        console.error("Error setting user online:", error);
      }
    }
  }

  async function setUserOffline() {
    if (onlineData && onlineData.id) {
      try {
        await pb.collection("online").delete(onlineData.id);
        isOnline = false;
        onlineData = null; // Reset onlineData
      } catch (error) {
        console.error("Error setting user offline:", error);
      }
    }
  }

  async function callPeerId(peerId) {
    isCalling = true;
    const call = peer.call(peerId, myStream);
    call.on("stream", function (remoteStream) {
      strangerStream = remoteStream;
      const data = {
        isInCall: true,
      };

      try {
        pb.collection("online").update(onlineData.id, data);
      } catch (error) {
        console.error("Error updating call status:", error);
      }
    });

    // Update the online record to show the user is in a call
  }

  function startSearch() {
    searchInterval = setInterval(searchPartner, 5000);
  }

  async function searchPartner() {
    let user = pb.authStore.model;
    try {
      // Check who is not in call
      const records = await pb.collection("online").getFullList({
        sort: "created",
        filter: `isInCall = false && user != "${user.id}"`,
      });

      console.log(records);

      if (records.length > 0) {
        clearInterval(searchInterval);
        console.log("Partner found");

        // Assuming we take the first available partner
        callPeerId(records[0].peerId);
      } else {
        console.log("Searching for partner");
      }
    } catch (error) {
      console.error("Error searching for partners:", error);
    }
  }

  if (typeof window !== "undefined") {
    window.addEventListener("beforeunload", async () => {
      if (peer) {
        await setUserOffline(); // Ensure the user is marked offline
        peer.destroy();
      }
    });
  }
</script>

{#if !$currentUser}
  <LoginSelector />
{:else}
  <div class="flex flex-col h-screen">
    <!-- Row 1: Cameras -->
    <div class="flex h-1/2">
      <div class="w-1/2 p-4">
        <You
          on:stream={handleStream}
          on:stop={handleStop}
          on:skip={handleSkip}
        />
      </div>
      <div class="w-1/2 p-4 border-l border-gray-300">
        <Stranger {strangerStream} />
      </div>
    </div>

    <!-- Row 2: Chat -->
    <!-- <div class="h-1/2 p-4">
      <Chat />
    </div> -->
  </div>
{/if}
