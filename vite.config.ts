import { defineConfig } from "vite";
import { resolve } from 'path';
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/cs2-notebook/",
  build: {
    minify: false,
    outDir: "dist", // 构建输出目录
    emptyOutDir: true, // ��空 dist 目录
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        notFound: resolve(__dirname, '404.html'),
      }
    },
  }
});
