<script>
    import { pb } from "$lib/pocketbase";

    let username = '';
    let password = '';
    let loginError = '';

    async function login() {
        try {
            loginError = ''; // Reset error message

            // Attempt to authenticate with PocketBase
            const authData = await pb.collection('accounts').authWithPassword(username, password);
            
            window.location.href="/"
        } catch (error) {
            console.log("error:", error);
            loginError = handleError(error);
        }
    }

    // Error handling function
    function handleError(error) {
        // General error messages
        if (error.message.includes('Failed to authenticate')) {
            return 'Invalid email or password. Please try again.';
        }
        if (error.message.includes('validation')) {
            return 'Invalid input. Please check your email and password length.';
        }
        return 'An unexpected error occurred. Please try again later.';
    }
</script>

<main class="flex flex-col min-h-screen justify-center">
    <div class="flex justify-center py-8 animate-fade-in-bottom">
        <div
            class="bg-zinc-950 relative transform overflow-hidden rounded-lg bg-zinc-925 border-2 border-zinc-900 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:w-full sm:max-w-sm sm:p-6"
        >
            <div
                class="flex min-h-full flex-1 flex-col justify-center px-6 py-4 lg:px-8"
            >
                <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        class="mx-auto h-16 w-auto"
                        src="/icon.gif"
                        alt="Description of Image"
                        id="Layer_1"
                        data-name="Layer 1"
                    />
                    <h2
                        class="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-blue-100 font-poppins"
                    >
                        Login to your account
                    </h2>
                </div>
                <form
                    class="mt-4 sm:mx-auto sm:w-full sm:max-w-sm"
                    on:submit|preventDefault={login}
                >
                    <div class="text-red-500 text-sm mb-4" id="login-error">
                        {loginError}
                    </div>
                    <div class="flex flex-col gap-3">
                        <div class="flex flex-col gap-2">
                            <label
                                for="identifier"
                                class="block text-sm font-medium leading-6 text-blue-100 font-poppins"
                            >Email</label>
                            <input
                                type="text"
                                class="bg-zinc-800 block w-full rounded-md border-0 py-1.5 text-blue-100 font-poppins shadow-sm ring-1 ring-inset ring-zinc-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                id="identifier"
                                required
                                bind:value={username}
                            />
                        </div>
                        <div class="flex flex-col gap-2">
                            <div class="flex items-center justify-between">
                                <label
                                    for="password"
                                    class="block text-sm font-medium leading-6 text-blue-100 font-poppins"
                                >Password</label>
                                <div class="text-sm">
                                    <a
                                        href="https://discord.gg/7cDVsEgvBv"
                                        target="_blank"
                                        class="font-semibold text-blue-600 hover:text-blue-500 font-poppins"
                                    >Forgot password?</a>
                                </div>
                            </div>
                            <input
                                type="password"
                                class="bg-zinc-800 block w-full rounded-md border-0 py-1.5 text-blue-100 font-poppins shadow-sm ring-1 ring-inset ring-zinc-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                id="password"
                                required
                                bind:value={password}
                            />
                        </div>
                        <div class="flex flex-col gap-3">
                            <div class="relative flex items-start">
                                <div class="flex h-6 items-center">
                                    <input
                                        id="rememberme"
                                        name="rememberme"
                                        type="checkbox"
                                        class="h-4 w-4 rounded bg-zinc-800 border-zinc-700 focus:ring-0 focus:outline-none focus:ring-offset-0 focus:ring-offset-transparent duration-300"
                                    />
                                </div>
                                <div class="ml-2 text-sm leading-6">
                                    <label
                                        for="rememberme"
                                        class="font-medium text-blue-100 font-poppins outline-none"
                                    >Remember Me</label>
                                </div>
                            </div>

                            <button
                                type="submit"
                                class="bg-blue-700 border-2 border-blue-600 hover:bg-blue-600 active:translate-y-1 duration-300 rounded-md opacity-80 p-1 w-full text-base text-white font-poppins font-medium"
                            >
                                Login
                            </button>
                            <div class="text-sm text-center">
                                <a href="/register.html">
                                    <button
                                        type="button"
                                        class="font-semibold text-blue-600 hover:text-blue-500 cursor-pointer font-poppins"
                                    >
                                        Don't have an account? Register
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</main>
