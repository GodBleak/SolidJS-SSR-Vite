import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

export default defineConfig({
  plugins: [
    solid({
      ssr: true,
      hot: true,
    }),
  ],
});
