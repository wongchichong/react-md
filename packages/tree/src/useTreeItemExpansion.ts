import { $, $$ } from 'voby'

import type { ExpandedIds, TreeItemExpansion, TreeItemId } from "./types"

/**
 * A hook that implements the base functionality for expanding different tree
 * items.
 *
 * @param defaultExpandedIds - Either a list of tree item ids to be expanded by
 * default or a function that will return the list of tree item ids to be
 * expanded by default
 * @returns An object containing props that can be passed to the `Tree`
 * component to handle the expansion state within the tree.
 */
export function useTreeItemExpansion(
    defaultExpandedIds: FunctionMaybe<ExpandedIds>
): TreeItemExpansion {
    const expandedIds = $($$(defaultExpandedIds))
    const onItemExpansion = (itemId: TreeItemId, expanded: boolean) => {
        expandedIds((expandedIds) => {
            const i = expandedIds.indexOf(itemId)
            if (i === -1 && expanded) {
                return [...expandedIds, itemId]
            }

            if (i !== -1 && !expanded) {
                const nextIds = expandedIds.slice()
                nextIds.splice(i, 1)
                return nextIds
            }

            return expandedIds
        })
    }

    return {
        expandedIds,
        onItemExpansion,
        onMultiItemExpansion: expandedIds,
    }
}
