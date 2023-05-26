import fs from 'fs'
import path from 'path'

const packages = fs
    .readdirSync(path.join(process.cwd(), 'packages'))
    .filter((name) => !['dev-utils', 'codemod'].includes(name))

const roots = packages.map((name) => `<rootDir>/packages/${name}/src`)
roots.push('<rootDir>/packages/codemod')

const docsSrc = '<rootDir>/packages/documentation/src'

console.log(process.argv[0])
//@ts-ignore
const isWatchMode = /(-w|--watch)(\s?.+)?$/.test(process.argv)

let collectCoverageFrom = []
if (!isWatchMode) {
    collectCoverageFrom = [
        '<rootDir>/packages/*/src/**/*.{ts,tsx}',
        // internal usage and don't matter for the library coverage reports
        '!<rootDir>/packages/{dev-utils,documentation,material-icons,react-md}/src/**/*',
        '!<rootDir>/packages/codemod/**/*',
        // these are generated files
        '!<rootDir>/packages/*/src/scssVariables.ts',
        // index.ts files are always `export * from "./fileOrFolder"`
        '!<rootDir>/packages/**/index.ts',
    ]
}

export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    roots,
    testMatch: [
        "**/__tests__/**/*.+(ts|tsx|js)",
        // "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],

    setupFilesAfterEnv: ['<rootDir>/testSetup/init.ts'],
    transform: {
        // '\\.svg$': '<rootDir>/testSetup/inlineSvgTransformer.js',
        // '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
        //     '<rootDir>/testSetup/fileTransformer.js',
        '^.+\\.tsx?$': ['ts-jest', {
            tsconfig: './tsconfig.test.json',
            useESM: true,
            // other ts-jest config options
        }],
    },
    moduleNameMapper: {
        '\\.scss$': 'identity-obj-proxy',
        '^constants/(.*)$': `${docsSrc}/constants/$1`,
        '^components/(.*)$': `${docsSrc}/components/$1`,
        '^hooks/(.*)$': `${docsSrc}/hooks/$1`,
        '^icons/(.*)$': `${docsSrc}/icons/$1`,
        '^pages/(.*)$': `${docsSrc}/pages/$1`,
        '^utils/(.*)$': `${docsSrc}/utils/$1`,
        "voby": "<rootDir>/node_modules/voby"
    },
    collectCoverageFrom,
    watchPlugins: [
        'jest-watch-typeahead/filename',
        'jest-watch-typeahead/testname',
    ],
    modulePaths: ["<rootDir>",],
    moduleDirectories: ['node_modules', 'src'],

}
