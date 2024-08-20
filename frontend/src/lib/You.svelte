<script>
    import { createEventDispatcher } from "svelte";
    
    const dispatch = createEventDispatcher();
    let stop = true;
    let videoElement;
    let stream;

    async function startCam() {
        try {
            stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            videoElement.srcObject = stream;
            stop = false;
            dispatch("stream", stream);
        } catch (error) {
            console.error("Error accessing the camera:", error);
            dispatch("skip");
        }
    }

    function stopCam() {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            videoElement.srcObject = null;
            stop = true;
            dispatch("stop");
        }
    }
</script>

<div class="flex flex-col items-center justify-center h-full p-4">
    <div class="w-[640px] h-[480px] bg-white rounded-lg shadow-lg relative overflow-hidden">
        <div class="flex justify-center items-center h-full bg-gray-100">
            <video
                bind:this={videoElement}
                autoplay
                muted
                style={`display: ${stop ? 'none' : 'block'}`}
            ></video>
            {#if stop}
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
                    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
                    <circle cx="12" cy="13" r="3"></circle>
                </svg>
            {/if}
        </div>
        <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
            <button
                class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 border border-gray-300 bg-white hover:bg-blue-600 hover:text-white h-10 px-4 py-2"
                on:click={startCam}
            >
                {stop ? "Start" : "Next"}
            </button>
            <button
                class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 border h-10 px-4 py-2"
                class:bg-red-600={!stop}
                class:bg-gray-200={stop}
                class:text-white={!stop}
                class:text-gray-500={stop}
                class:cursor-not-allowed={stop}
                on:click={stopCam}
                disabled={stop}
            >
                Stop
            </button>
        </div>
    </div>
</div>
