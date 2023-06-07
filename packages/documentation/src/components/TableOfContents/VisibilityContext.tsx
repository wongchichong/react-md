import type { ReactElement, ReactNode } from 'voby'
import { createContext, useContext, useEffect, useMemo } from 'voby'
import { useAppSize, useToggle } from "@react-md/utils"
import '@react-md/react'

//@ts-ignore
import tocs from "constants/meta/tocs"

interface TOCVisibility {
    visible: boolean
    rendered: boolean
}

const TOCVisibility = createContext<TOCVisibility>({
    visible: false,
    rendered: false,
})

interface TOCActionsContext {
    show: () => void
    hide: () => void
    toggle: () => void
}

const noop = (): void => {
    // do nothing
}

const TOCActions = createContext<TOCActionsContext>({
    show: noop,
    hide: noop,
    toggle: noop,
})

interface TOCVisibilityProviderProps {
    pathname: string
    children: Children
}

export function TOCVisibilityProvider({
    children,
    pathname,
}: TOCVisibilityProviderProps): Child {
    const { isLargeDesktop } = useAppSize()
    const [visible, show, hide, toggle] = useToggle(isLargeDesktop)

    useEffect(() => {
        if (isLargeDesktop) {
            show()
        } else {
            hide()
        }

        // disabled since I only want to update it on desktop changes
        // eslint-disable-next-line react-hooks/exhaustive-deps
    })

    // I get SSR errors in dev mode since I normally have the dev tools open which
    // results in different app sizes
    const rendered =
        !!tocs[pathname]?.length && process.env.NODE_ENV === "production"
    const actions = useMemo(() => ({ show, hide, toggle }))
    const visibility = useMemo(() => ({
            visible,
            rendered,
        }))

    return (
        <TOCVisibility.Provider value={visibility}>
            <TOCActions.Provider value={actions}>{children}</TOCActions.Provider>
        </TOCVisibility.Provider>
    )
}

export function useTOCVisibility(): TOCVisibility {
    return useContext(TOCVisibility)
}

export function useTOCActions(): TOCActionsContext {
    return useContext(TOCActions)
}
