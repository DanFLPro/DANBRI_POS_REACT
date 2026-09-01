import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/DANBRI_POS_REACT/', // ← NOMBRE DEL REPOSITORIO EN GITHUB (MAYÚSCULAS)
})