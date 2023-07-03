import type { ReactElement } from 'voby'
import { useEffect, $ } from 'voby'
import { AppBar } from "@react-md/app-bar"
import { Tabs, TabsManager } from "@react-md/tabs"
import { CrossFade } from "@react-md/transition"

import Container from "./Container"
import Page1 from "./Page1"
import Page2 from "./Page2"
import Page3 from "./Page3"

export default function CrossFadeExamplesStatic(): Child {
    const page = $<number>(0)
    let content = <Page1 />
    if (page() === 1) {
        content = <Page2 />
    } else if (page() === 2) {
        content = <Page3 />
    }

    // don't want the first render to trigger the animation, but all changes afterwards
    // should.
    const rendered = $(false)
    useEffect(() => {
        rendered(true)
    })

    return (
        <>
            <TabsManager
                activeIndex={page}
                onActiveIndexChange={(index) => page(index)}
                tabs={["Page 1", "Page 2", "Page 3"]}
                tabsId="static-transition"
            >
                <AppBar theme="default">
                    <Tabs />
                </AppBar>
            </TabsManager>
            <Container>
                <CrossFade key={page} appear={rendered()}>
                    {content}
                </CrossFade>
            </Container>
        </>
    )
}
