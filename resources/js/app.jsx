import './bootstrap';
import '../css/app.css';
import '@fortawesome/fontawesome-free/css/all.css'

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import {__} from "@/Utils/translations";

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        let userId = props.initialPage?.props?.auth?.user?.id
        /*
        if(userId) {
            window.Echo.private(`message.received.${userId}`)
                .listen('.message.received', (e) => {
                    console.log(e);
                });
        }

         */

        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#007bff',
        showSpinner: true
    },
});
