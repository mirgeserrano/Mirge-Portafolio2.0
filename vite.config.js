import { defineConfig, loadEnv} from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({mode}) => {

const env = loadEnv(mode, process.cwd(), "");

	return {
    plugins: [react()],
    server: {
      proxy: {
        "/api2": {
          target: env.VITE_FIBRE_API_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (p) => p.replace(/^\/api2/, ""),
        },
        "/api": {
          target: env.VITE_THEFACTORY_API_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (p) => p.replace(/^\/api/, ""),
        },
      },
      cors: false,
    },
  };
});