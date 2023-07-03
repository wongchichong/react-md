import { 
 createContext, 
 useContext, 
 useEffect, 
 useMemo, 
 $, 
 } from 'voby'
import Cookie from "js-cookie"
import '@react-md/react'

import { EventName, sendAnalyticsEvent } from "../../utils/analytics"

export const CODE_PREFERENCE = "codePref"

/**
 * Should the sandboxes and code preview use TypeScript or Javascript?
 *
 * This should eventually be updated to modify markdown as well. Bit more
 * difficult.
 */
export type CodePreference = "ts" | "js"

export interface CodePreferenceContext {
    pref: CodePreference
    toggle(): void
}

const context = createContext<CodePreferenceContext>({
    pref: "ts",
    toggle: () => {
        throw new Error("not implemented")
    },
})

if (process.env.NODE_ENV !== "production") {
    context.displayName = "CodePreferenceContext"
}
const { Provider } = context

export function useCodePreference(): CodePreferenceContext {
    return useContext(context)
}

export function useJs(): boolean {
    return useCodePreference().pref === "js"
}

export function toCodePreference(pref: string | undefined): CodePreference {
    return pref === "js" ? "js" : "ts"
}

export function getDefaultCodePreference(
    cookies?: Record<string, string | undefined>
): CodePreference {
    if (cookies) {
        return toCodePreference(cookies[CODE_PREFERENCE])
    }

    if (typeof localStorage !== "undefined") {
        const localPref = localStorage.getItem(CODE_PREFERENCE)
        if (localPref) {
            return toCodePreference(localPref)
        }
    }

    return toCodePreference(Cookie.get(CODE_PREFERENCE))
}

export interface CodePreferenceProviderProps {
    children: Children
    defaultPreference: CodePreference
}

export function CodePreferenceProvider({
    children,
    defaultPreference,
}: CodePreferenceProviderProps): Child {
    const pref = $(defaultPreference)
    const value = useMemo(() => ({
            toggle() {
                pref((prev) => (prev === "js" ? "ts" : "js"))
            },
        }))

    const firstRender = $(true)
    useEffect(() => {
        if (firstRender()) {
            firstRender(false)
            const def = getDefaultCodePreference()
            if (def !== pref()) {
                Cookie.set(CODE_PREFERENCE, def, { sameSite: "Strict" })
                pref(def)
            }

            return
        }

        sendAnalyticsEvent({
            name: EventName.CodePreference,
            lang: pref(),
        })
        Cookie.set(CODE_PREFERENCE, pref(), { sameSite: "Strict" })
        localStorage.setItem(CODE_PREFERENCE, pref())
    })

    return <Provider value={value}>{children}</Provider>
}
