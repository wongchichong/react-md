import '@react-md/react'

import {
  createContext,
  $,
  useContext,
  useMemo,
} from 'voby'

interface NestedDialogContext {
  stack: readonly string[]
  add: (dialogId: string) => void
  remove: (dialogId: string) => void
}

const noop = (): void => {
  // do nothing
}

const context = createContext<NestedDialogContext>({
  stack: [],
  add: noop,
  remove: noop,
})

/* istanbul ignore next */
//@ts-ignore
if (process.env.NODE_ENV !== "production") {
  //@ts-ignore
  context.displayName = "NestedDialogContext"
}

const { Provider } = context

export interface NestedDialogContextProviderProps {
  children: Children
}

/**
 * This component is used to help with handling nested dialogs by:
 * - preventing all dialogs to be closed when the escape key is pressed
 * - hiding the overlays for dialogs that are not the top-most focus
 *
 * This should be added to the root of your app if you would like to enable this
 * feature.
 */
export function NestedDialogContextProvider({ children, }: NestedDialogContextProviderProps): Element {
  const stack = $<readonly string[]>([])
  const add = $((dialogId: string) => {
    stack((prevStack) => {
      /* istanbul ignore next */
      if (
        process.env.NODE_ENV !== "production" &&
        prevStack.includes(dialogId)
      ) {
        /* eslint-disable no-console */
        console.warn(
          "Tried to add a duplicate dialog id to the `NestedDialogContext`."
        )
        console.warn(
          `This means that you have two dialogs with the same id: \`${dialogId}\`.`
        )
        console.warn(
          "This should be fixed before moving to production since this will break accessibility and is technically invalid."
        )
      }

      return prevStack.concat(dialogId)
    })
  })
  const remove = $((dialogId: string) => {
    stack((prevStack) => prevStack.filter((id) => id !== dialogId))
  })
  const value = useMemo(() => ({ stack: stack(), add, remove }))

  return <Provider value={value}>{children}</Provider>
}

/**
 * Gets the current nested dialog context. This shouldn't really be used
 * externally and is a private context hook.
 *
 * @internal
 */
export function useNestedDialogContext(): NestedDialogContext {
  return useContext(context)
}
