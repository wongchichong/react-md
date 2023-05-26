import { defineConfig } from 'vite'

const config = defineConfig({
    build: {
        minify: false,
        lib: {
            entry: ["./src/index.ts"],
            name: "react",
            formats: ['cjs', 'es', 'umd'],
            fileName: (format: string, entryName: string) => `${entryName}.${format}.js`
        },
        // rollupOptions: {
        //   output: {
        //     preserveModules: true,
        //   }
        // },
    },


    esbuild: {
        jsx: 'automatic',
    },

    css: {
        modules: {
            scopeBehaviour: 'global',
            localsConvention: 'camelCase',
        }
    },
})



export default config
