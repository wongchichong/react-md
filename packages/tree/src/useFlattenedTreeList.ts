import { $, $$, Observable, ObservableMaybe } from 'voby'
import { useMemo } from 'voby'

import { getTreeItemId } from "./getTreeItemId"
import type {
    ExpandedIds,
    TreeItemId,
    TreeProps,
    UnknownTreeItem,
} from "./types"
import type { NestedTreeItem } from "./useNestedTreeList"

export interface SearchableTreeItem {
    /**
     * A DOM Node `id` to use.
     */
    id: string

    /**
     * A searchable value for the tree item.
     */
    value: string

    isParent: boolean
    itemId: TreeItemId
    parentId: TreeItemId | null
}

type TreeConfig = Required<
    Pick<TreeProps<UnknownTreeItem>, "valueKey" | "getItemValue">
>

interface FlattenOptions extends TreeConfig {
    list: FunctionMaybe<SearchableTreeItem[]>
    item: FunctionMaybe<NestedTreeItem<UnknownTreeItem>>
    index: FunctionMaybe<number>
    baseId: FunctionMaybe<string>
    parentIndexes: FunctionMaybe<number[]>
}

function flatten({
    list: ls,
    item: it,
    index: idd,
    baseId,
    parentIndexes: pid,
    valueKey: vk,
    getItemValue,
}: FlattenOptions): SearchableTreeItem[] {
    const list = $$(ls), item = $$(it), index = $$(idd), parentIndexes = $$(pid), valueKey = $$(vk)

    if (item.isCustom)
        return list

    const id = getTreeItemId($$(baseId), index, parentIndexes)
    const value = getItemValue(item, valueKey)
    const { itemId, parentId, childItems } = item
    list.push({
        id,
        itemId,
        parentId,
        isParent: !!childItems,
        value,
    })

    if (!childItems)
        return list

    const nextIndexes = [...parentIndexes, index + 1]
    childItems.forEach((child, childIndex) => {
        flatten({
            list,
            item: child,
            index: childIndex,
            valueKey,
            getItemValue,
            baseId,
            parentIndexes: nextIndexes,
        })
    })

    return list
}

interface Options extends TreeConfig {
    id: FunctionMaybe<string>
    items: FunctionMaybe<readonly NestedTreeItem<UnknownTreeItem>[]>
    expandedIds: FunctionMaybe<ExpandedIds>
    rootId: FunctionMaybe<TreeItemId | null>
}

export type TreeItemRef = Observable<HTMLLIElement | null>
export interface ItemMetadata {
    id: string
    ref: TreeItemRef
    visibleIndex: number
}

export type MetadataRecord = Record<TreeItemId, ItemMetadata>

interface ItemCollection {
    itemRefs: MetadataRecord
    visibleItems: SearchableTreeItem[]
}

type ReturnValue = [SearchableTreeItem[], MetadataRecord, SearchableTreeItem[]]

/**
 * Creates a flattened and ordered list of all the tree items that are current visible
 * in the DOM based on the expanded ids. This is only required for handling keyboard
 * navigation with `aria-activedescendant` movement so the items can be "focused" with
 * typeahead and keyboard movement since the keyboard movement API requires DOM refs
 * to be passed to each element.
 *
 * This flattened list will remove the `childItems` (if it existed) on each item for
 * simplicity and the child items aren't needed for this flattened list.
 *
 * @internal
 */
export function useFlattenedTreeList({
    id,
    items: its,
    rootId,
    expandedIds,
    valueKey,
    getItemValue,
}: Options): ReturnValue {
    const items = $$(its)

    const flattenedItems = useMemo(() =>
        items.reduce<SearchableTreeItem[]>(
            (list, item, index) =>
                flatten({
                    list,
                    item,
                    index,
                    valueKey,
                    getItemValue,
                    baseId: id,
                    parentIndexes: [],
                }),
            []
        ))

    const { visibleItems, itemRefs } = useMemo(() => {
        let index = 0
        return flattenedItems().reduce<ItemCollection>(
            (collection, item) => {
                const { parentId, itemId } = item
                let isVisible = parentId === rootId
                if (parentId !== null && $$(expandedIds).includes(parentId)) {
                    // need to also make sure that the parent is visible
                    isVisible =
                        (collection.itemRefs[parentId]?.visibleIndex ?? -1) !== -1
                }

                collection.itemRefs[itemId] = {
                    id: item.id,
                    ref: $(null),
                    visibleIndex: isVisible ? index : -1,
                }
                if (isVisible) {
                    index += 1
                    collection.visibleItems.push(item)
                }
                return collection
            },
            { visibleItems: [], itemRefs: {} }
        )
    })()


    return [visibleItems, itemRefs, flattenedItems()]
}
