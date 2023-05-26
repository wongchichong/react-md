import { defineConfig } from 'vite'

const config = defineConfig({
    build: {
        minify: false,
        lib: {
            entry: ["./src/index.ts"],
            name: "typography",
            formats: ['umd'],
            fileName: (format: string, entryName: string) => `${entryName}.${format}.js`
        },
        emptyOutDir: false,
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
