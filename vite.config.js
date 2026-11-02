import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
// base './' deixa o build funcionar em qualquer hospedagem (Netlify, GitHub Pages, pasta compartilhada)
export default defineConfig({
 base:'./',
 plugins:[react()],
 build:{rollupOptions:{output:{manualChunks:{three:['three'],r3f:['@react-three/fiber','@react-three/drei']}}}}})
