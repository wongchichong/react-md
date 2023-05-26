import { useMemo, $$ } from 'voby'

import type { QuerySize } from "./constants"
import { useMediaQuery } from "./useMediaQuery"

/**
 * This is a small helper that will create a media query block based on the
 * provided width value.
 */
export const toWidthPart = (
    v: QuerySize | undefined,
    prefix: "min" | "max"
): string => {
    const type = typeof v
    if (type === "undefined") {
        return ""
    }

    const value = type === "number" ? `${v}px` : v
    return `(${prefix}-width: ${value})`
}

interface WidthMediaQuery {
    min?: FunctionMaybe<QuerySize>
    max?: FunctionMaybe<QuerySize>
}

type WidthMediaQuerys =
    | { min: FunctionMaybe<QuerySize> }
    | { max: FunctionMaybe<QuerySize> }
    | { min: FunctionMaybe<QuerySize>; max: FunctionMaybe<QuerySize> }

/**
 * This is a simple hoo that will create a memoized media query string with the
 * provided min anx max values.
 *
 * @param min - An optional min value to use
 * @param max - An optional max value to use
 * @returns a boolean if the current media query is a match.
 */
export function useWidthMediaQuery({ min: mn, max: mx, }: WidthMediaQuery & WidthMediaQuerys): boolean {
    const min = $$(mn), max = $$(mx)

    const query = useMemo(() => {
        const parts = [toWidthPart(min, "min"), toWidthPart(max, "max")]
            .filter(Boolean)
            .join(" and ")

        return `screen and ${parts}`
    })

    return useMediaQuery(query())
}
