


import { defineConfig } from 'vite'

// import mdPlugin, { Mode } from 'vite-plugin-markdown';
import sassDts from 'vite-plugin-sass-dts'
import { viteStaticCopy } from 'vite-plugin-static-copy'



const config = defineConfig({
    build: {
        minify: false,
        lib: {
            entry: ["./src/index.ts", "./src/styles.scss"],
            name: "badge",
            formats: ['cjs', 'es'],
            fileName: (format: string, entryName: string) => `${entryName}.${format}.js`
        },
    },
    esbuild: {
        jsx: 'automatic',
    },
    plugins: [
        sassDts({
            enabledMode: ['development', 'production'],
            global: {
                generate: true,
                // outFile: path.resolve(__dirname, './src/style.d.ts'),
            },
        }),
        viteStaticCopy({
            targets: [
                {
                    src: 'src/*.scss',
                    dest: './'
                }
            ]
        }),
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
