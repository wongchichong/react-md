import { defineConfig } from 'vite'

const config = defineConfig({
    build: {
        minify: false,
        lib: {
            entry: ["./src/index.ts"],
            name: "form",
            formats: ['umd'],
            fileName: (format: string, entryName: string) => `${entryName}.${format}.js`
        },
        emptyOutDir: false,
    },
    esbuild: {
        jsx: 'automatic',
    },
})


export default config
