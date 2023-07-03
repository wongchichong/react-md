import type { ReactElement, ReactNode } from "react"

import {
    ArrowDropDownSVGIcon,
    FolderOpenSVGIcon,
    FolderSVGIcon,
} from "@react-md/material-icons"
import type { GetItemProps, TreeData, TreeItemIds } from "@react-md/tree"
import {
    Tree,
    useTreeItemExpansion,
    useTreeItemSelection,
} from "@react-md/tree"

import FileSVGIcon from "icons/FileSVGIcon"
import Html5SVGIcon from "icons/Html5SVGIcon"
import SassSVGIcon from "icons/SassSVGIcon"
import TypescriptSVGIcon from "icons/TypescriptSVGIcon"
import createIdGenerator from "utils/createIdGenerator"

import styles from "./CustomizingTreeItems.module.scss"

type ItemType = "folder" | "html" | "typescript" | "scss" | "text"
interface Item extends TreeItemIds {
    name: string
    type: ItemType
}

const uuid = createIdGenerator("custom-tree-items")
const createItem = (
    name: string,
    type: ItemType,
    parentId: string | null = null
): Item => {
    const itemId = uuid()
    return {
        itemId,
        parentId,
        name,
        type,
    }
}

const publicFolder = createItem("public", "folder")
const srcFolder = createItem("src", "folder")
const indexHtml = createItem("index.html", "html", srcFolder.itemId)
const robots = createItem("robots.txt", "text", publicFolder.itemId)
const demo = createItem("Demo.tsx", "typescript", srcFolder.itemId)
const variables = createItem("_variables.scss", "scss", srcFolder.itemId)
const index = createItem("index.ts", "typescript", srcFolder.itemId)

const data = [
    publicFolder,
    srcFolder,
    indexHtml,
    robots,
    demo,
    variables,
    index,
].reduce<TreeData<Item>>(
    (tree, item) => ({ ...tree, [item.itemId]: item }),
    {}
)

const getItemProps: GetItemProps<Item> = (item) => {
    const { selected, focused, expanded, type } = item
    let leftAddon: ReactNode = null
    switch (type) {
        case "folder":
            leftAddon = expanded ? <FolderOpenSVGIcon /> : <FolderSVGIcon />
            break
        case "html":
            leftAddon = <Html5SVGIcon />
            break
        case "text":
            leftAddon = <FileSVGIcon />
            break
        case "scss":
            leftAddon = <SassSVGIcon />
            break
        case "typescript":
            leftAddon = <TypescriptSVGIcon />
            break
        // no default
    }

    return {
        leftAddon,
        expanderIcon: <ArrowDropDownSVGIcon />,
        className: cn(styles.item, {
            [styles.focused]: focused,
            [styles.selected]: selected,
        }),
    }
}

export default function CustomizingTreeItems(): Child {
    const selection = useTreeItemSelection([demo.itemId], false)
    const expansion = useTreeItemExpansion([
        srcFolder.itemId,
        publicFolder.itemId,
    ])

    return (
        <Tree
            id="customizing-tree-items"
            data={data}
            aria-label="Tree"
            className={styles.tree}
            {...selection}
            {...expansion}
            getItemProps={getItemProps}
        />
    )
}
