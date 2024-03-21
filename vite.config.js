import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/

export default defineConfig({
  
  plugins: [react()],
 // env: config().parsed,
  
  // server: {
  //   proxy: {
  //     "/api": `${import.meta.env.VITE_THEFACTORY_API_URL}`,
  //   },
  // },
});
