import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'wxt';
import path from "path";

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: 'src',

  modules: ['@wxt-dev/module-react'],

  manifest: {
    manifest_version: 3,
    name: "Sheetcode Extension",
    version: "0.0.1",
    description: "A simple Chrome extension to keep track of coding problems solved on different platforms.",
    permissions: ["activeTab", "tabs"],
    icons: {
      16: "icon/16x16.png",
      32: "icon/32x32.png",
      192: "icon/192x192.png",
      180: "icon/180x180.png"
    },
    action: {
      default_title: "Sheetcode",
      default_icon: {
        16: "icon/16x16.png",
        32: "icon/32x32.png",
        192: "icon/192x192.png",
        180: "icon/180x180.png"
      }
    }
  },

  vite: () => ({
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  }),
});
