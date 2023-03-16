/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

import Echo from 'laravel-echo';

import Pusher from 'pusher-js';
window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER ?? 'mt1',
    wsHost:  window.location.hostname,//import.meta.env.VITE_PUSHER_HOST ? import.meta.env.VITE_PUSHER_HOST : `ws-${import.meta.env.VITE_PUSHER_APP_CLUSTER}.pusher.com`,
    wsPort: 6001,//import.meta.env.VITE_PUSHER_PORT ?? 80,
    //wssPort: import.meta.env.VITE_PUSHER_PORT ?? 443,
    forceTLS: false,//(import.meta.env.VITE_PUSHER_SCHEME ?? 'https') === 'https',
    enabledTransports: ['ws', 'wss'],
    //enabledTransports: ['ws', 'wss'],
});


/*
window.Echo.channel('message.received.1')
    .listen('message.received', (e) => {
        console.log(e);
    });

 */

/*
window.pusher = new Pusher('inertia', {
    wsHost: window.location.hostname,
    cluster:'inertia',
    wsPort: 6001,
    wssPort: 6001,
    wsPath: '',
    disableStats: true,
   authEndpoint: 'http://laravel.inertia/laravel-websockets/auth',
    auth: {
        headers: {
            'X-CSRF-Token': "{{ csrf_token() }}",
            'X-App-ID': "inertia"
        }
    },
    enabledTransports: ['ws', 'flash']
});

let channel = window.pusher.subscribe("message.received.1");
channel.bind("message.received", (data) => {
    console.log(data)
});

 */

