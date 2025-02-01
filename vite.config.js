import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
 server: {
  port:5178},headers: {
    'Content-Security-Policy': "script-src 'self' https://apis.google.com https://www.gstatic.com 'unsafe-inline' 'unsafe-eval';"
  }
});
