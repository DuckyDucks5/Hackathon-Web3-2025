import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'url';
import environment from 'vite-plugin-environment';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: '../../.env' });

function getHtmlEntries(dir) {
  const entries = {};
  function recurse(currentDir) {
    fs.readdirSync(currentDir).forEach(file => {
      const fullPath = path.join(currentDir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        recurse(fullPath);
      } else if (file.endsWith('.html')) {
        const name = path.relative(dir, fullPath).replace(/\\/g, '/');
        entries[name] = fullPath;
      }
    });
  }
  recurse(dir);
  return entries;
}

export default defineConfig({
  build: {
    emptyOutDir: true,
    
    rollupOptions: {
      input: getHtmlEntries(__dirname),
    },

  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:4943",
        changeOrigin: true,
      },
    },
    open: '/auth/login.html',
  },
  publicDir: "assets",
  plugins: [
    environment("all", { prefix: "CANISTER_" }),
    environment("all", { prefix: "DFX_" }),
  ],
  resolve: {
    alias: [
      {
        find: "declarations",
        replacement: fileURLToPath(
          new URL("../declarations", import.meta.url)
        ),
      },
    ],
    dedupe: ['@dfinity/agent'],
  },
});
