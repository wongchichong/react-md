import type { ReactElement, ReactNode } from 'voby'
import { useMemo } from 'voby'

import type { ThemeMode } from "./colors"
import { ThemeContext } from "./useTheme"
import { ThemeActionsContext } from "./useThemeActions"
import useThemeConfiguration from "./useThemeConfiguration"

export interface ThemeProps {
    defaultTheme?: ThemeMode
    children: Children
}

export default function Theme({
    defaultTheme = "light",
    children,
}: ThemeProps): Child {
    const {
        primary,
        secondary,
        accent,
        theme,
        setPrimary,
        setSecondary,
        setAccent,
        toggleTheme,
        reset,
    } = useThemeConfiguration(defaultTheme)

    const currentTheme = useMemo(() => ({
            primary,
            secondary,
            accent,
            theme,
        }))
    const actions = useMemo(() => ({
            setPrimary,
            setSecondary,
            setAccent,
            toggleTheme,
            reset,
        }))

    return (
        <ThemeContext.Provider value={currentTheme}>
            <ThemeActionsContext.Provider value={actions}>
                {children}
            </ThemeActionsContext.Provider>
        </ThemeContext.Provider>
    )
}
