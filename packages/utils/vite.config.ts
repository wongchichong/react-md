/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import voby from 'voby-vite';
import sassDts from 'vite-plugin-sass-dts'
import { viteStaticCopy } from 'vite-plugin-static-copy'

const config = defineConfig({
    build: {
        minify: false,
        lib: {
            entry: ["./src/index.ts", "./src/styles.scss"],
            name: "utils",
            formats: ['cjs', 'es'],
            fileName: (format: string, entryName: string) => `${entryName}.${format}.js`
        },
        // rollupOptions: {
        //   output: {
        //     preserveModules: true,
        //   }
        // },
    },
    test: {
        globals: true,
        environment: 'jsdom',
        transformMode: {
            web: [/.[jt]sx?/],
        },
        threads: false,
        isolate: false,

        include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}', '**/__tests__/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],

        // browser: {
        //     enabled: true,
        //     name: 'chrome', // browser name is required
        // },
        // reporters: ['html'],
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

    plugins: [
        // mdPlugin({ mode: [Mode.HTML] }),
        // voby({
        //     enabled: (process.env.NODE_ENV !== 'production'), // Whether HMR is enabled or not
        //     filter: /\.(jsx|tsx)$/ // Regex matching the files containing components to enable HMR for
        // }),
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
