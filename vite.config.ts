import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'node:path'
import checker from 'vite-plugin-checker'
import svgr from 'vite-plugin-svgr'
import eslintPlugin from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    react(),
    checker({
      typescript: true,
    }),
    svgr(),
    eslintPlugin({
      include: ['src/**/*.ts', 'src/**/*.tsx'],
    }),
  ],
  server: {
    host: 'localhost',
    port: 3000,
    cors: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 추가적인 전역 변수, 믹스인 등을 여기에 설정할 수 있습니다.
        additionalData: '@import "@/styles/variables.scss";',
      },
    },
  },
})
