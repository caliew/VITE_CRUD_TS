import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config({path:'./.env'});

// console.log('WEB ACCESS CODE=',process.env.WEB_ACCESS_TOKEN);
// console.log('MAPBOXGL ACCESS CODE=',process.env.MAPBOXGL_ACCESS_TOKEN);

// https://vitejs.dev/config/
export default defineConfig({
  server : {
    port : 3001,
    host : '0.0.0.0'
  },
  plugins: [react()]
})