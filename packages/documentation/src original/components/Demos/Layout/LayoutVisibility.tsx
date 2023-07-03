import type { ReactElement } from "react"
import { Button } from "@react-md/button"
import { isPersistentLayout, useLayoutConfig } from "@react-md/layout"
import { Typography } from "@react-md/typography"

import Blockquote from "components/Blockquote"
import CodeBlock from "components/CodeBlock"

export default function LayoutVisibility(): Child {
    const { showNav, hideNav, ...remaining } = useLayoutConfig()
    const code = `const config = ${JSON.stringify(
        {
            showNav: "function",
            hideNav: "function",
            ...remaining,
        },
        null,
        2
    )}`

    return (
        <div>
            <CodeBlock language="typescript">{code}</CodeBlock>
            {isPersistentLayout(remaining.layout) && (
                <Blockquote>
                    <Typography>
                        The visibility cannot be changed for persistent layouts so the
                        buttons will do nothing.
                    </Typography>
                </Blockquote>
            )}
            <Button onClick={showNav}>Show</Button>
            <Button onClick={hideNav} theme="secondary">
                Hide
            </Button>
        </div>
    )
}
