<div class="video-background">
    <video autoplay loop muted id="bg-video">
        <track kind="captions" />
        <source src="/videos/bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
    </video>
</div>
<slot/>

<style lang="postcss">
    @keyframes fadeInBottom {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    :root {
        background-color: #09090b;
        overflow: hidden;
        margin: 0;
        padding: 0;
    }

    .video-background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: -1; /* Ensure video is behind all other content */
    }

    #bg-video {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        height: 100%;
        object-fit: cover; /* Ensures the video covers the entire container */
        transform: translate(-50%, -50%);
        z-index: -1;
        filter: blur(5px); /* Add blur effect to the video */
    }
</style>