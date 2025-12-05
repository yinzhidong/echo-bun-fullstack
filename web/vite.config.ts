import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    rollupOptions: {

      // 多应用
      input: {
        main: path.resolve(__dirname, 'index.html'),
        app1: path.resolve(__dirname, 'app1.html')
      },

      output: {
        dir: 'dist',
        compact: true,//该选项用于压缩 Rollup 产生的额外代码。请注意，这个选项不会影响用户的代码。这个选择在构建已经压缩好的代码时是很有用的。
        // entryFileNames: "[name]/assets/js/[name]-[hash].js",
        // chunkFileNames: "[name]/assets/js/[name]-[hash].js",
        // assetFileNames: "[name]/assets/[ext]/[name].[ext]",

        // entryFileNames: "assets/js/[name]-[hash].js",
        // chunkFileNames: "assets/js/[name]-[hash].js",
        // assetFileNames: "assets/[ext]/[name].[ext]",
      }
    }
  }
})
