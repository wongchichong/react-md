import { useEffect, $, $$ } from 'voby'

import type {
    BaseTreeItem,
    TreeData,
    TreeItemRenderer,
    TreeProps,
} from "@react-md/tree"
import { Tree } from "@react-md/tree"
import { bem } from "@react-md/utils"

import { defaultMiniNavigationItemRenderer } from "./defaultMiniNavigationItemRenderer"
import { defaultNavigationItemRenderer } from "./defaultNavigationItemRenderer"
import { useLayoutConfig } from "./LayoutProvider"
import type { LayoutNavigationItem } from "./types"
import { isTemporaryLayout } from "./utils"

const styles = bem("rmd-layout-nav")

export type BaseLayoutTreeProps<T extends BaseTreeItem = LayoutNavigationItem> =
    Omit<TreeProps<T>, "id" | "data" | "aria-label" | "aria-labelledby">

export interface LayoutTreeProps<T extends BaseTreeItem = LayoutNavigationItem>
    extends BaseLayoutTreeProps<T> {
    /**
     * The id to use for the tree. When this is omitted, it will be set to
     * `${baseId}-navigation-tree` where the `baseId` is the `id` provided to the
     * parent `Layout` component.
     */
    id?: FunctionMaybe<Nullable<string>>

    /**
     * An optional `aria-label` to provide to the tree. This will be defaulted to
     * `"Navigation"`.
     */
    "aria-label"?: FunctionMaybe<Nullable<string>>

    /**
     * An optional space-delimited list of ids that help describe this tree. This
     * can be used instead of an `aria-label` or alongside for additional screen
     * reader description.
     */
    "aria-labelledby"?: FunctionMaybe<Nullable<string>>

    /**
     * Boolean if the `LayoutTree` is being rendered as the mini variant. This
     * will update the `itemRenderer` to default to the
     * `defaultMiniNavigationItemRenderer` instead of the
     * `defaultNavigationItemRenderer`.
     *
     * @remarks \@since 2.7.0
     */
    mini?: FunctionMaybe<Nullable<boolean>>

    /**
     * Boolean if the mini navigation should be treated as a "sticky" element.
     * This should really only be `true` if disabling the fixed `AppBar` behavior
     * in the `Layout`.
     *
     * @remarks \@since 2.8.3
     */
    sticky?: FunctionMaybe<Nullable<boolean>>

    /**
     * The {@link TreeItemRenderer} to use if the `mini` prop is enabled.
     *
     * @remarks \@since 2.8.3
     */
    miniItemRenderer?: TreeItemRenderer<T>

    /**
     * Optional style to provide to the `<nav>` element surrounding the tree
     */
    navStyle?: FunctionMaybe<Nullable<string | StyleProperties>>

    /**
     * Optional className to provide to the `<nav>` element surrounding the tree
     */
    navClassName?: Class

    /**
     * The navigation items to render.
     */
    navItems: TreeData<T>

    /**
     * Boolean if the temporary navigation type should no longer automatically
     * close when the `selectedIds` updates to contain a new route when using the
     * `useLayoutNavigation` hook.  This makes it so when a user on mobile clicks
     * a route within your app in the main navigation pane, it will automatically
     * close if it was a link.
     */
    disableTemporaryAutoclose?: FunctionMaybe<Nullable<boolean>>
}

/**
 * Renders the navigation tree for the Layout component that adds some
 * reasonable defaults to work with navigation items.
 */
export const LayoutTree = (
    {
        id: propId,
        "aria-labelledby": ariaLabelledBy,
        "aria-label": ariaLabel = ariaLabelledBy ? undefined : "Navigation",
        className,
        mini = false,
        sticky = false,
        navStyle,
        navClassName,
        navItems,
        labelKey = "children",
        valueKey = "children",
        itemRenderer = defaultNavigationItemRenderer,
        miniItemRenderer = defaultMiniNavigationItemRenderer,
        selectedIds,
        disableTemporaryAutoclose = false,
        ref,
        ...props
    }: LayoutTreeProps //<HTMLUListElement>
) => {
    const { baseId, layout, hideNav, visible } = useLayoutConfig()
    const selectedId = $$(selectedIds)
    const lastSelectedId = $(selectedId)
    const isTemporary = isTemporaryLayout($$(layout))

    const id = propId ?? `${baseId}-navigation-tree`

    useEffect(() => {
        if (
            disableTemporaryAutoclose ||
            !isTemporary ||
            !visible ||
            lastSelectedId() === selectedId
        ) {
            // need to update the lastSelectedId since the selectedId might've changed
            // by a route change OUTSIDE of the navigation drawer. if it isn't
            // updated, it'll automatically close the next time it is opened.
            lastSelectedId(selectedId)
            return
        }

        lastSelectedId(selectedId)
        hideNav()
    })

    return (
        <nav
            id={`${id}-nav`}
            style={navStyle}
            className={[styles({ sticky, grow: !sticky }), navClassName]}
        >
            <Tree
                {...props}
                id={id}
                ref={ref}
                aria-label={ariaLabel}
                aria-labelledby={ariaLabelledBy}
                data={navItems}
                labelKey={labelKey}
                valueKey={valueKey}
                selectedIds={selectedIds}
                itemRenderer={mini ? miniItemRenderer : itemRenderer}
                className={["rmd-layout-tree", className]}
            />
        </nav>
    )
}