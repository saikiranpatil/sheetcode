import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    permissions: ["activeTab", "tabs", "storage"],
    version: '0.0.0',
    name: 'Sheetcode Extension',
    description: 'A simple Chrome extension to keep track of all coding problems from different coding platforms.',
  },
  vite: () => ({
    plugins: [
      react(),
      tailwindcss()
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  }),
});
