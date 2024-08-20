<script>
    import {pb} from "$lib/pocketbase";
    import {goto} from "$app/navigation"

    let username = "";
    let email = "";
    let password = "";
    let confirmPassword = "";
    let tos = false;
    let error = "";
    let success = "";

    async function handleSubmit(event) {
        event.preventDefault();
        error = "";
        success = "";

        if (password !== confirmPassword) {
            error = "Passwords do not match.";
            return;
        }

        if (!tos) {
            error = "You must agree to the TOS.";
            return;
        }

        if (password.length < 7)
        {
            error = "password too short"
            return;
        }

        const data = {
            "username": username,
            "email": email,
            "emailVisibility": true,
            "password": password,
            "passwordConfirm": confirmPassword,
        }; 
        
        try {
            console.log("Submitting data:", data); // Log data to ensure it's correct
            await pb.collection("accounts").create(data);
            console.log("User created successfully");
            await pb.collection("accounts").requestVerification(email);
            success =
                "Registration successful! You can now log in. Please check your email to verify your account.";
            goto('/login')
                
        } catch (err) {
            error = "Invalid email"
        }
    }
</script>

<main class="flex flex-col min-h-screen justify-center">
    <div class="flex justify-center py-8 animate-fade-in-bottom">
        <div
            class="relative transform overflow-hidden rounded-lg bg-zinc-925 border-2 border-zinc-900 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:w-full sm:max-w-sm sm:p-6 bg-zinc-950"
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
                        Register for an account
                    </h2>
                </div>
                <form on:submit={handleSubmit}>
                    <div class="flex flex-col gap-3">
                        <div class="flex flex-col gap-2">
                            <label
                                for="username"
                                class="block text-sm font-medium leading-6 text-blue-100 font-poppins"
                                >Username</label
                            >
                            <input
                                type="text"
                                class="bg-zinc-800 block w-full rounded-md border-0 py-1.5 text-blue-100 font-poppins shadow-sm ring-1 ring-inset ring-zinc-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                id="username"
                                placeholder=""
                                bind:value={username}
                                required
                            />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label
                                for="email"
                                class="block text-sm font-medium leading-6 text-blue-100 font-poppins"
                                >Email</label
                            >
                            <input
                                type="email"
                                class="bg-zinc-800 block w-full rounded-md border-0 py-1.5 text-blue-100 font-poppins shadow-sm ring-1 ring-inset ring-zinc-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                id="email"
                                placeholder=""
                                bind:value={email}
                                required
                            />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label
                                for="password"
                                class="block text-sm font-medium leading-6 text-blue-100 font-poppins"
                                >Password</label
                            >
                            <input
                                type="password"
                                class="bg-zinc-800 block w-full rounded-md border-0 py-1.5 text-blue-100 font-poppins shadow-sm ring-1 ring-inset ring-zinc-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                id="password"
                                placeholder=""
                                bind:value={password}
                                required
                            />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label
                                for="confirmPassword"
                                class="block text-sm font-medium leading-6 text-blue-100 font-poppins"
                                >Confirm Password</label
                            >
                            <input
                                type="password"
                                class="bg-zinc-800 block w-full rounded-md border-0 py-1.5 text-blue-100 font-poppins shadow-sm ring-1 ring-inset ring-zinc-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                id="confirmPassword"
                                placeholder=""
                                bind:value={confirmPassword}
                                required
                            />
                        </div>
                        <div class="flex flex-col gap-3">
                            <div class="relative flex items-start">
                                <div class="flex h-6 items-center">
                                    <input
                                        id="tos"
                                        name="tos"
                                        type="checkbox"
                                        class="h-4 w-4 rounded bg-zinc-800 border-zinc-700 focus:ring-0 focus:outline-none focus:ring-offset-0 focus:ring-offset-transparent duration-300"
                                        bind:checked={tos}
                                        required
                                    />
                                </div>
                                <div class="ml-2 text-sm leading-6">
                                    <label
                                        for="tos"
                                        class="font-medium text-blue-100 font-poppins outline-none"
                                    >
                                        I have read and agree to the
                                        <a
                                            href="/tos"
                                            target="_blank"
                                            class="text-blue-600 font-semibold hover:text-blue-500 cursor-pointer"
                                            >TOS</a
                                        >
                                    </label>
                                </div>
                            </div>
                            <button
                                type="submit"
                                class="bg-blue-700 border-2 border-blue-600 hover:bg-blue-600 active:translate-y-1 duration-300 rounded-md opacity-80 p-1 w-full text-base text-white font-poppins font-medium"
                            >
                                Register
                            </button>
                        </div>
                        <div class="text-sm text-center">
                            <a
                                href="/login"
                                class="font-semibold text-blue-600 hover:text-blue-500 cursor-pointer font-poppins"
                            >
                                Already have an account? Log in
                            </a>
                        </div>
                    </div>
                </form>
                {#if error}
                    <div class="text-red-500">{error}</div>
                {/if}
                {#if success}
                    <div class="text-green-500">{success}</div>
                {/if}
            </div>
        </div>
    </div>
</main>
