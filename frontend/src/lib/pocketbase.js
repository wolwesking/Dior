import PocketBase from 'pocketbase';
import {writable} from 'svelte/store'


export const pb = new PocketBase('http://127.0.0.1:8090'); // Replace with your PocketBase URL LATER

export const currentUser = writable(pb.authStore.model)

pb.authStore.onChange((auth)=>{
    currentUser.set(pb.authStore.model)
})
