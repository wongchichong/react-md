import { defineConfig } from 'vite'
import sassDts from 'vite-plugin-sass-dts'
import { viteStaticCopy } from 'vite-plugin-static-copy'

const config = defineConfig({
    build: {
        minify: false,
        lib: {
            entry: ["./src/__tests__/test.ts"],
            name: "utils",
            formats: ['cjs'],
            fileName: (format: string, entryName: string) => `${entryName}.${format}.js`
        },
        emptyOutDir:false,
        rollupOptions: {
            external: ['react', 'react-dom', 'voby', 'oby', "voby/jsx-runtime", 'voby-jasmine'],
            output: {
                globals: {
                    'react': 'React',
                    'react-dom': 'ReactDOM',
                    'voby': 'voby',
                    'oby': 'oby',
                    'voby/jsx-runtime':'jsxRuntime',
                    'voby-jasmine': 'vobyj'
                }
            }
        },
    },

    esbuild: {
        jsx: 'automatic',
    },
})



export default config
