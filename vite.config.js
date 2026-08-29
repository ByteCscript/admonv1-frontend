import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://100.53.127.149:8080',
        changeOrigin: true,
      },
    },
  },
})
