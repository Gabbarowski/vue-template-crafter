import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import sass from 'sass'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      vue(),
      dts({
        insertTypesEntry: true,
      })
  ],
  build: {
    sourcemap: true,
    lib: {
      entry: "src/index.ts",
      name: "VueTemplateCrafter",
      fileName: "vue-template-crafter",
    },
    rollupOptions: {
      input: {
        layoutComponents: "src/styles/layout-components.scss"
      },
      external: ["vue"]
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass
      }
    }
  }
});