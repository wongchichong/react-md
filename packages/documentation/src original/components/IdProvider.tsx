import type { ReactNode, ReactElement } from "react"
import { createContext, useContext, useMemo } from "react"
import createIdGenerator from "../../utils/createIdGenerator"

type IdGenerator = ReturnType<typeof createIdGenerator>

const context = createContext<IdGenerator>(createIdGenerator("autoid"))
const { Provider } = context

export function useId(id?: FunctionMaybe<Nullable<string>>): string {
    const generator = useContext(context)

    return useMemo(() => {
        if (id) {
            return id
        }

        return generator()
    }, [id, generator])
}

export interface IdProviderProps {
    prefix?: FunctionMaybe<Nullable<string>>
    children: Children
}

export function IdProvider({
    children,
    prefix = "autoid",
}: IdProviderProps): Child {
    const value = useMemo(() => createIdGenerator(prefix), [prefix])

    return <Provider value={value}>{children}</Provider>
}
