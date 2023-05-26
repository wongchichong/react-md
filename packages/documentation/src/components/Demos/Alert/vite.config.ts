


import { defineConfig } from 'vite'
import mdPlugin, { Mode } from 'vite-plugin-markdown'



const config = defineConfig({
    build: {
        minify: false,
        lib: {
            entry: ["./index.tsx", "./UpdatingMessagePriority.scss"],
            name: "alert",
            formats: ['cjs', 'es'],
            fileName: (format: string, entryName: string) => `${entryName}.${format}.js`
        },
    },
    esbuild: {
        jsx: 'automatic',
    },
    plugins: [
        mdPlugin({ mode: [Mode.HTML] }),
    ],
    css: {
        modules: {
            scopeBehaviour: 'global',
            localsConvention: 'camelCase',
        },
        preprocessorOptions: {
            sass: {
                "load-path": "./node_modules"
            }
        }
    },

})



export default config
