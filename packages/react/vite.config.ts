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
        rollupOptions: {
            external: ['react', 'react-dom', 'voby', 'oby'],
            output: {
                globals: {
                    'react': 'React',
                    'react-dom': 'ReactDOM',
                    'voby': 'voby',
                    'oby': 'oby',
                }
            }
        },
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
