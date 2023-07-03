import type { ReactElement } from 'voby'
import { Suspense, $ } from 'voby'
import { AppBar } from "@react-md/app-bar"
import { CircularProgress } from "@react-md/progress"
import { Tabs, TabsManager } from "@react-md/tabs"
import { CrossFade } from "@react-md/transition"
import { Typography } from "@react-md/typography"

import useFakeLazyImport from "hooks/useFakeLazyImport"

import Container from "./Container"
import Page1 from "./Page1"
import Page2 from "./Page2"
import Page3 from "./Page3"

interface CurrentPageProps {
    page: number
}

function CurrentPage({ page }: CurrentPageProps): Child {
    let content = <Page1 />
    if (page === 1) {
        content = <Page2 />
    } else if (page === 2) {
        content = <Page3 />
    }

    return <CrossFade>{content}</CrossFade>
}

export default function CrossFadeExamplesAsync(): Child {
    // just make it so it doesn't start loading until a new tab is shown
    const page = $<number>(-1)
    const Content = useFakeLazyImport<CurrentPageProps>(CurrentPage, page(), 5000)

    return (
        <>
            <TabsManager
                activeIndex={page === -1 ? 0 : page}
                onActiveIndexChange={(index) => page(index)}
                tabs={["Page 1", "Page 2", "Page 3"]}
                tabsId="static-transition"
            >
                <AppBar theme="default">
                    <Tabs />
                </AppBar>
            </TabsManager>
            <Container>
                {page === -1 && (
                    <Typography type="headline-6">
                        {'Click on "Page 2" or "Page 3" to start the demo'}
                    </Typography>
                )}
                {page !== -1 && (
                    <Suspense fallback={<CircularProgress id="async-loading-progress" />}>
                        <Content page={page} />
                    </Suspense>
                )}
            </Container>
        </>
    )
}
