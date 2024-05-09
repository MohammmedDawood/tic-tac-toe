import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // start browser automatically
  server: {
    open: true,
    // specify the port number
    port: 3000,
  },
});
