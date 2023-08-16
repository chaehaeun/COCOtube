import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'node:path'
// import checker from 'vite-plugin-checker'
import svgr from 'vite-plugin-svgr'
import CompressionPlugin from 'vite-plugin-compression'
import viteImagemin from '@vheemstra/vite-plugin-imagemin'
import imageminGifSicle from 'imagemin-gifsicle'
import imageminMozjpeg from 'imagemin-mozjpeg'
import imageminPngQuant from 'imagemin-pngquant'
import imageminSvgo from 'imagemin-svgo'
import imageminWebp from 'imagemin-webp'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    react(),
    // checker({
    //   typescript: true,
    // }),
    svgr(),
    CompressionPlugin({
      algorithm: 'gzip',
      ext: '.gz',
    }),
    viteImagemin({
      plugins: {
        jpg: imageminMozjpeg(),
        png: imageminPngQuant(),
        gif: imageminGifSicle(),
        svg: imageminSvgo(),
      },
      makeWebp: {
        plugins: {
          jpg: imageminWebp(),
          png: imageminWebp(),
        },
      },
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
