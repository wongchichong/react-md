


import { defineConfig } from 'vite'

// import mdPlugin, { Mode } from 'vite-plugin-markdown';
import sassDts from 'vite-plugin-sass-dts'
import { viteStaticCopy } from 'vite-plugin-static-copy'


const config = defineConfig({
    build: {
        minify: false,
        lib: {
            entry: ["./src/index.ts", "./src/styles.scss"],
            name: "table",
            formats: ['cjs', 'es'],
            fileName: (format: string, entryName: string) => `${entryName}.${format}.js`
        },

        // rollupOptions: {
        //   output: {
        //     preserveModules: true,
        //   }
        // },
    },
    resolve: {
        preserveSymlinks: true,
    },

    esbuild: {
        jsx: 'automatic',
    },

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

    plugins: [
        // mdPlugin({ mode: [Mode.HTML] }),
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
})



export default config
