<script>
    export let strangerStream;
    let stream;
    let noFeed = true;

    $: noFeed = !strangerStream || strangerStream === "noFeed";
    $: if (!noFeed) {
        stream.srcObject = strangerStream;
    }
</script>

<div class="flex flex-col items-center justify-center h-full p-4">
    <div
        class="relative w-[640px] h-[480px] bg-gray-200 rounded-lg overflow-hidden"
    >
        <video
            bind:this={stream}
            class="w-full h-full object-cover"
            autoplay
            style={`display: ${noFeed ? "none" : "block"}`}
            ><track kind="captions" />
        </video>

        {#if noFeed}
            <div class="absolute inset-0 flex items-center justify-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="text-gray-500"
                >
                    <path
                        d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"
                    ></path>
                    <circle cx="12" cy="13" r="3"></circle>
                </svg>
            </div>
        {/if}
    </div>
</div>
