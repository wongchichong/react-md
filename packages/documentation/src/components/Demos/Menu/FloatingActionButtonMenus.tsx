import type { ReactElement } from 'voby'
import type { FABPosition } from "@react-md/button"
import { MoreVertSVGIcon } from "@react-md/material-icons"

import SimpleExample from "./SimpleExample"

const positions: FABPosition[] = [
    "top-left",
    "top-right",
    "bottom-left",
    "bottom-right",
]

export default function FloatingActionButtonMenus(): Child {
    return (
        <>
            {positions.map((position) => (
                <SimpleExample
                    id={`fab-menu-${position}`}
                    key={position}
                    aria-label="Options..."
                    floating={position}
                    buttonChildren={<MoreVertSVGIcon />}
                    fixedPositionOptions={{
                        disableSwapping: true,
                    }}
                />
            ))}
        </>
    )
}
