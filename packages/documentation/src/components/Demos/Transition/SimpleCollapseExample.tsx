import type { ReactElement } from 'voby'
import { $ } from 'voby'
import { Button } from "@react-md/button"
import { Collapse } from "@react-md/transition"

import Page1 from "./Page1"

export default function SimpleCollapseExample(): Child {
    const collapsed = $(true)
    return (
        <>
            <Button onClick={() => collapsed(!collapsed)}>Toggle</Button>
            <Collapse collapsed={collapsed}>
                <Page1 />
            </Collapse>
        </>
    )
}
