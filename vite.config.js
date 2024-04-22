// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   server: {
//     proxy: {
//      "/api": {
//         target: 'https://demoemision.thefactoryhka.com.ve',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, '')
//       },
//       "/api1": "http://uplinkfibra.net/api/v1",
//       "/home": "http://192.168.1.51:6163/api/",
//     },
//   },
//   plugins: [react()],
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    proxy: {
     "/api": {
        target: 'https://demoemision.thefactoryhka.com.ve',
        changeOrigin: true,
      },
      "/apiNew":  {
        target: 'http://uplinkfibra.net/api/v1',
        changeOrigin: true,
      },
      "/home": "http://192.168.1.51:6163/api/",
    },
  },
  plugins: [react()],
});
