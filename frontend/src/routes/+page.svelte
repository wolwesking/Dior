<script>
  import You from "$lib/You.svelte";
  import Stranger from "$lib/Stranger.svelte";
  import Chat from "$lib/Chat.svelte";
  import { currentUser, pb } from "$lib/pocketbase";
  import LoginSelector from "$lib/LoginSelector.svelte";
  pb.autoCancellation(false);
  
  let strangerStream;
  let myStream;
  let isOnline = false;
  let onlineData;
  let peer;
  let searchInterval;
  let isCalling = false;

  async function peerSetUp() {
    const { default: PeerJs } = await import("peerjs");
    const Peer = PeerJs;

    if (peer) {
      peer.destroy();
    }
    peer = new Peer();

    peer.on("error", (err) => {
      console.error("PeerJS error:", err);
    });

    return peer;
  }

  async function handleStream(event) {
    myStream = event.detail;
    console.log("Received stream:", myStream);

    peer = await peerSetUp();

    peer.on("open", (id) => {
      console.log("PeerJS connection opened with ID:", id);
      setUserOnline(id);
      startSearch();
    });

    peer.on("close", () => {
      console.log("PeerJS connection closed");
      setUserOffline();
    });

    peer.on("call", function (call) {
      console.log("Incoming call:", call);
      if (!isCalling) {
        call.answer(myStream);
        call.on("stream", async function (remoteStream) {
          console.log("Received remote stream:", remoteStream);
          strangerStream = remoteStream;
          const data = { isInCall: true };

          try {
            await pb.collection("online").update(onlineData.id, data);
          } catch (error) {
            console.error("Error updating call status:", error);
          }

          clearInterval(searchInterval); // Stop search for both clients
        });

        call.on("error", (err) => {
          console.error("Call error:", err);
        });
      }
    });
  }

  async function handleStop() {
    strangerStream = "noFeed";
    clearInterval(searchInterval);
    if (peer) {
      peer.destroy();
      peer = null;
    }
    console.log("Call stopped and peer destroyed.");
  }

  async function handleSkip() {
    console.log("Skipping current partner.");
    handleStop(); // Reset the peer connection
    startSearch(); // Restart the search
  }

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
        console.log("User set online with data:", onlineData);
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
        onlineData = null;
        console.log("User set offline.");
      } catch (error) {
        console.error("Error setting user offline:", error);
      }
    }
  }

  async function callPeerId(peerId) {
    console.log("Calling peer ID:", peerId);
    isCalling = true;
    const call = peer.call(peerId, myStream);
    
    call.on("stream", async function (remoteStream) {
      console.log("Received remote stream from called peer:", remoteStream);
      strangerStream = remoteStream;
      const data = { isInCall: true };

      try {
        await pb.collection("online").update(onlineData.id, data);
      } catch (error) {
        console.error("Error updating call status:", error);
      }

      clearInterval(searchInterval); // Ensure both clients stop searching
    });

    call.on("error", (err) => {
      console.error("Call error:", err);
    });
  }

  function startSearch() {
    console.log("Starting partner search...");
    searchInterval = setInterval(searchPartner, 5000);
  }

  async function searchPartner() {
    let user = pb.authStore.model;
    try {
      const records = await pb.collection("online").getFullList({
        sort: "created",
        filter: `isInCall = false && user != "${user.id}"`,
      });

      if (records.length > 0) {
        clearInterval(searchInterval);
        console.log("Partner found:", records[0].peerId);
        callPeerId(records[0].peerId);
      } else {
        console.log("No partner found, continuing search...");
      }
    } catch (error) {
      console.error("Error searching for partners:", error);
    }
  }

  if (typeof window !== "undefined") {
    window.addEventListener("beforeunload", async () => {
      if (peer) {
        await setUserOffline();
        peer.destroy();
      }
    });
  }
</script>

{#if !$currentUser}
  <LoginSelector />
{:else}
  <div class="flex flex-col h-screen">
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
    <!-- Row 2: Chat (optional) -->
  </div>
{/if}
