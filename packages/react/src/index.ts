///// <reference types="voby/dist/jsx/types" />

import { FunctionMaybe } from "voby"

export const Children = {
    count: (e: JSX.Child) => Array.isArray(e) ? e.length : (!!e ? 1 : 0),
    forEach: (e: JSX.Child, fn: (value: JSX.Child, index: number, array: JSX.Child[]) => void, thisArg?: any) => Array.isArray(e) ? e.forEach(fn, thisArg ?? e) : fn(e, 0, null),
    map: <T,>(e: JSX.Child, fn: (value: JSX.Child, index: number, array: JSX.Child[]) => T, thisArg?: any) => Array.isArray(e) ? e.map(fn, thisArg ?? e) : [fn(e, 0, null)],
    toArray: (e: JSX.Child) => Array.isArray(e) ? e : [e],

    only: (e: JSX.Child) => {
        if (Array.isArray(e)) {
            if (e.length) {
                return e[0]
            } else {
                throw new Error('Only 1 child is allowed')
            }
        } else {
            return e
        }
    },
}

declare global {
    //@ts-ignore
    export const process: {
        env: {
            NODE_ENV: 'development' | 'production' | 'test'
        }
    }
}

if (!window.process)
    window.process = {} as any
if (!process.env)
    process.env = { NODE_ENV: 'development' }



