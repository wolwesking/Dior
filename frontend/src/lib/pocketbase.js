import PocketBase from 'pocketbase';
import {writable} from 'svelte/store'


export const pb = new PocketBase('https://nxqhvj44-8090.euw.devtunnels.ms/'); // Replace with your PocketBase URL LATER

export const currentUser = writable(pb.authStore.model)

pb.authStore.onChange((auth)=>{
    currentUser.set(pb.authStore.model)
})
