import type { ReactElement } from 'voby'
import { 
 Tree, 
 useTreeItemSelection, 
 useTreeItemExpansion,  } from "@react-md/tree"

import folders from "./folders"

export default function SingleSelectTree(): Child {
    const selection = useTreeItemSelection([], false)
    const expansion = useTreeItemExpansion([])

    return (
        <Tree
            id="single-select-tree"
            data={folders}
            aria-label="Tree"
            {...selection}
            {...expansion}
        />
    )
}
