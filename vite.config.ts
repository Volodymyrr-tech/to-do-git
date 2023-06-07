// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   build: {
//     outDir: 'docs',
//     base: '/to-do-git/',
//   },
// })

// import { defineConfig } from 'vite'
// import reactRefresh from '@vitejs/plugin-react-refresh'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [reactRefresh()],
//   base: '/to-do-git/',
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/to-do-git/',
  plugins: [react()],
})
