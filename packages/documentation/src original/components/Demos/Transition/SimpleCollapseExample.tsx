import type { ReactElement } from "react"
import { useState } from "react"
import { Button } from "@react-md/button"
import { Collapse } from "@react-md/transition"

import Page1 from "./Page1"

export default function SimpleCollapseExample(): Child {
    const [collapsed, setCollapsed] = useState(true)
    return (
        <>
            <Button onClick={() => setCollapsed(!collapsed)}>Toggle</Button>
            <Collapse collapsed={collapsed}>
                <Page1 />
            </Collapse>
        </>
    )
}
