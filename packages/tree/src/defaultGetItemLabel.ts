import type { UnknownTreeItem } from "./types"

/**
 * A "reasonable" default implementation for rendering a label for a tree item.
 *
 * @internal
 */
export function defaultGetItemLabel(
    item: UnknownTreeItem,
    labelKey: string
): Child {
    let result: Child = item[labelKey] as Child
    if (typeof result === "undefined") {
        result = item.children
    }

    if (typeof result === "undefined") {
        result = null
    }

    return result
}
