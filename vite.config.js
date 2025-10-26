import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5173,
    open: true, // Abre el navegador automáticamente
    fs: {
      allow: ['.'], // Permite acceso a archivos del proyecto
    },
  },
  build: {
    outDir: 'dist',
    // Mantener los nombres de archivos para debugging
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  // Preservar el import map de index.html
  optimizeDeps: {
    exclude: ['react', 'react-dom'], // Ya están en el import map
  },
});
