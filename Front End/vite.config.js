import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/chat': {
        target: 'http://localhost:5000', // Your Flask API base URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
