<script>
    import You from "$lib/You.svelte";
    import Stranger from "$lib/Stranger.svelte";
    import Chat from "$lib/Chat.svelte";
    import { currentUser } from '$lib/pocketbase';
    import LoginSelector from "$lib/LoginSelector.svelte";
</script>

{#if !$currentUser}
  <LoginSelector />
{:else}
  <div class="flex flex-col h-screen">
    <!-- Row 1: Cameras -->
    <div class="flex h-1/2">
      <div class="w-1/2 p-4">
        <You />
      </div>
      <div class="w-1/2 p-4 border-l border-gray-300">
        <Stranger />
      </div>
    </div>

    <!-- Row 2: Chat -->
    <div class="h-1/2 p-4">
      <Chat />
    </div>
  </div>
{/if}
