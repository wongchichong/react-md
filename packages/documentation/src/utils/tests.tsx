/* eslint-disable import/export */
/* eslint-disable @typescript-eslint/no-empty-function */
import type { ReactElement, ReactNode } from 'voby'
import { RouterContext } from "next/dist/shared/lib/router-context"
import type { NextRouter } from "next/router"
import { Configuration } from "@react-md/layout"
import type { AppSize } from "@react-md/utils"
import type { RenderOptions, RenderResult } from "@testing-library/react"
import { render as baseRender } from "@testing-library/react"

export * from "@testing-library/react"

export interface CustomOptions {
    router?: Partial<NextRouter>
    defaultAppSize?: AppSize
}

export interface CustomRenderOptions extends CustomOptions, RenderOptions { }

const DEFAULT_ROUTER: NextRouter = {
    push: () => Promise.resolve(false),
    replace: () => Promise.resolve(false),
    reload: () => { },
    back: () => Promise.resolve(false),
    prefetch: () => Promise.resolve(),
    beforePopState: () => { },
    basePath: "/",
    pathname: "/",
    query: {},
    route: "",
    asPath: "",
    events: {
        on: () => { },
        off: () => { },
        emit: () => { },
    },
    isFallback: false,
    isReady: true,
    isPreview: false,
    isLocaleDomain: true,
}

function AllProviders({
    children,
    router = DEFAULT_ROUTER,
    defaultAppSize,
}: CustomOptions & { children: ReactNode }): Child {
    return (
        <RouterContext.Provider value={{ ...DEFAULT_ROUTER, ...router }}>
            <Configuration defaultSize={defaultAppSize}>{children}</Configuration>
        </RouterContext.Provider>
    )
}

// it would be better do do this in a test setup script, but since
// this is required to run any tests, I'll do it here instead.

interface CustomRenderResult extends RenderResult {
    getById<E extends HTMLElement = HTMLElement>(id: string): E
    rerender(children: ReactElement, options?: CustomRenderOptions): void
}

export const render = (
    children: ReactElement,
    { defaultAppSize, router, ...options }: CustomRenderOptions = {}
): CustomRenderResult => {
    const result = baseRender(
        <AllProviders defaultAppSize={defaultAppSize} router={router}>
            {children}
        </AllProviders>,
        options
    )

    const getById = <E extends HTMLElement = HTMLElement>(id: string): E => {
        const el = document.getElementById(id)
        if (!el) {
            throw new Error(`Element not found with id: "${id}"`)
        }

        return el as E
    }

    const rerender = (
        children: ReactElement,
        options?: CustomRenderOptions & { key?: FunctionMaybe<Nullable<string>> | number }
    ): void => {
        result.rerender(
            <AllProviders
                defaultAppSize={defaultAppSize}
                router={router}
                {...options}
            >
                {children}
            </AllProviders>
        )
    }

    return {
        ...result,
        getById,
        rerender,
    }
}
