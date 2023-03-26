import './bootstrap';
import '../css/app.css';
import '@fortawesome/fontawesome-free/css/all.css'

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';
import {store} from "@/Store";
import {Provider} from "react-redux";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <Provider store={store}>
                <App {...props} />
            </Provider>
        );
    },
    progress: {
        color: '#007bff',
        showSpinner: true
    },
});
