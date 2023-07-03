


import { defineConfig } from 'vite'

// import mdPlugin, { Mode } from 'vite-plugin-markdown';
import sassDts from 'vite-plugin-sass-dts'
import { viteStaticCopy } from 'vite-plugin-static-copy'



const config = defineConfig({
  build: {
    minify: false,
    lib: {
      entry: ["./src/index.ts", "./src/styles.scss"],
      name: "form",
      formats: ['cjs', 'es'],
      fileName: (format: string, entryName: string) => `${entryName}.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'voby', 'oby', "voby/jsx-runtime"],
      output: {
          globals: {
              'react': 'React',
              'react-dom': 'ReactDOM',
              'voby': 'voby',
              'oby': 'oby',
              'voby/jsx-runtime':'jsxRuntime'
          }
      }
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
          src: ['src/*.scss'],
          dest: './'
        }
      ]
    }),
    viteStaticCopy({
      targets: [
        {
          src: ["src/label/*.scss"],
          dest: './label'
        }
      ]
    }),
    viteStaticCopy({
      targets: [
        {
          src: ["src/file-input/*.scss"],
          dest: './file-input'
        }
      ]
    }),
    viteStaticCopy({
      targets: [
        {
          src: ["src/select/*.scss"],
          dest: './select'
        }
      ]
    }),
    viteStaticCopy({
      targets: [
        {
          src: ["src/slider/*.scss"],
          dest: './slider'
        }
      ]
    }),
    viteStaticCopy({
      targets: [
        {
          src: ["src/toggle/*.scss"],
          dest: './toggle'
        }
      ]
    }),
    viteStaticCopy({
      targets: [
        {
          src: ["src/text-field/*.scss"],
          dest: './text-field'
        }
      ]
    })
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
