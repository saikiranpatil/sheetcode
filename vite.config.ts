import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    outDir: 'dist',
    assetsDir: '.',
    rollupOptions: {
      input: {
        landing: './index.html',
        popup: './src/popup/index.html',
        background: './src/popup/scripts/background/index.ts',
        content: './src/popup/scripts/content/index.ts',
      },
      output: {
        entryFileNames: assetInfo => {
          const name = assetInfo.name?.replace(/^src\//, '');
          if (name?.includes('background') || name?.includes('content')) {
            return '[name].js';
          }
          return 'assets/[name].[hash].js';
        },
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
      }
    }
  },
})