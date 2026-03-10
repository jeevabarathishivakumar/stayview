// Vite configuration file for React and Tailwind CSS
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Export Vite config with React and Tailwind plugins
export default defineConfig({
  plugins: [react(), tailwindcss()],
  
});
