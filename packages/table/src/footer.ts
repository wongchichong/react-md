import { createContext, useContext } from 'voby'
import '@react-md/react'

const context = createContext(false)
if (process.env.NODE_ENV !== "production") {
    //@ts-ignore
  context.displayName = "TableFooterContext"
}

/**
 * @internal
 */
export const { Provider: TableFooterProvider } = context

/**
 * @internal
 */
export function useTableFooter(): boolean {
  return useContext(context)
}
