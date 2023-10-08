import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { plugin as markdown, Mode } from 'vite-plugin-markdown';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 8080,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    vue(),
    markdown({
      mode: [Mode.HTML],
    }),
  ],
})
