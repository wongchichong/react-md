import { defineConfig } from 'vite'
import * as  glob from "glob"

// const fileArr = glob.globSync(["./packages/utils/src/__tests__/*.[tT]est.ts?(x)", "./packages/alert/src/__tests__/*.[tT]est.ts?(x)" ])

console.log("", fileArr)
const config = defineConfig({
    build: {
        minify: false,
        lib: {
            entry: fileArr,
            formats: ["es"],
            name: "123"
        },
        outDir: './test',
        rollupOptions: {
            external: ['jasmine'],
            output: {
                preserveModules: true
            }
        }
    },
    // esbuild: {
    //     jsx: 'automatic',
    // },

},
)



export default config
