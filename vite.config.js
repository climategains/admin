// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import PurgeIcons from 'vite-plugin-purge-icons'

const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  resolve:{
    alias:{
      '@' : path.resolve(__dirname, './src')
    },
  },
  plugins: [vue(), PurgeIcons({
    /* PurgeIcons Options */
  })]
})