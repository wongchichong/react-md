/** @type {import('ts-jest').JestConfigWithTsJest} */
// module.exports = {
//     preset: 'ts-jest',
//     testEnvironment: 'jsdom',

//     // globals: {
//     //     'ts-jest': {
//     //         compiler: "typescript"
//     //         // ts-jest configuration goes here
//     //     }
//     // },

//     transform: {
//         "^.+\\.tsx?$": "ts-jest",
//     },
//     testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
//     moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
// }

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',

  setupFilesAfterEnv: ['<rootDir>/init.ts'],

  testMatch: ['**/?(*.)+(spec|test).ts?(x)', '**/__tests__/**/*.ts?(x)'],
  globals: {
    'ts-jest': {
      tsconfig: {
        jsx: 'react-jsx',
        jsxImportSource: 'voby',
        strict: true,
        moduleResolution: 'node',
        // preserveSymlinks: true,
        noImplicitAny: false,
        strictNullChecks: false,
        lib: ['dom', 'dom.iterable', 'esnext'],
        types: ['voby/dist/jsx/jsx', 'jest'],
      },
    },
  },
  // transform: {
  //     // '\\.svg$': '<rootDir>/testSetup/inlineSvgTransformer.js',
  //     // '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
  //     //     '<rootDir>/testSetup/fileTransformer.js',
  //     '^.+\\.tsx?$': ['ts-jest', {
  //         // tsconfig: './tsconfig.test.json',
  //         // useESM: true,
  //         // // other ts-jest config options
  //         jsx: 'react-jsx',
  //         jsxImportSource: 'voby/testing',
  //         strict: true,
  //         moduleResolution: 'node',
  //         // preserveSymlinks: true,
  //         noImplicitAny: false,
  //         strictNullChecks: false,
  //         lib: [
  //             'dom',
  //             'dom.iterable',
  //             'esnext',
  //         ],
  //         types: [
  //             'voby/dist/jsx/jsx',
  //             'jest',
  //         ],
  //     }],
  // },

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  moduleFileExtensions: ['js', 'json', 'jsx', 'node', 'ts', 'tsx'],
};
