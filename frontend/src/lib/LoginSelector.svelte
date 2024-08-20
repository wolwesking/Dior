<script>
	import { goto } from '$app/navigation';
    function signUp()
    {
        goto("/register")
    }

    function login()
    {
        goto("/login")
    }
</script>

<div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
>
    <div class="bg-white rounded-lg p-6 shadow-lg w-full max-w-sm space-y-4">
        <h3 class="text-lg font-medium">Login or Sign Up</h3>
        <button
            class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full"
            on:click={login}
        >
            Login
        </button>
        <button
            class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full"
            on:click={signUp}
        >
            Sign Up
        </button>
    </div>
</div>