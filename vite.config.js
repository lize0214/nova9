import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    base: "/",
    server: {
        allowedHosts: ['e9d7-2001-f40-97e-d478-e4b8-6255-3aa9-bdd2.ngrok-free.app'],
    },
});
