import { defineConfig } from 'vite'
import sassDts from 'vite-plugin-sass-dts'
import { viteStaticCopy } from 'vite-plugin-static-copy'

const config = defineConfig({
    build: {
        minify: false,
        lib: {
            entry: ["./src/index.ts"],
            name: "utils",
            formats: ['umd'],
            fileName: (format: string, entryName: string) => `${entryName}.${format}.js`
        },
        emptyOutDir:false,
        // rollupOptions: {
        //   output: {
        //     preserveModules: true,
        //   }
        // },
    },

    esbuild: {
        jsx: 'automatic',
    },
})



export default config
