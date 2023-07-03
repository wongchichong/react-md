import type { ReactElement } from 'voby'
import { $ } from 'voby'

import { Checkbox, Select } from "@react-md/form"
import type { SupportedWideLayout } from "@react-md/layout"
import { Layout } from "@react-md/layout"
import { Grid } from "@react-md/utils"

import styles from "./ControllingTheLayout.module.scss"
import LayoutVisibility from "./LayoutVisibility"
import CloseButton from "./CloseButton"

const options: SupportedWideLayout[] = [
    "temporary",
    "temporary-mini",
    "toggleable",
    "toggleable-mini",
    "clipped",
    "floating",
    "full-height",
]

export default function ControllingTheLayout(): Child {
    const defaultVisible = $(false)
    const desktopLayout = $<SupportedWideLayout>("full-height")

    return (
        <Layout
            id="custom-layout"
            title="Toggleable Layout"
            navHeaderTitle="Another Title"
            tabletLayout="toggleable"
            landscapeTabletLayout="toggleable"
            desktopLayout={desktopLayout}
            largeDesktopLayout={desktopLayout}
            defaultToggleableVisible={defaultVisible}
            // this is only required since I already have a main element due to the
            // documentation site's Layout component
            mainProps={{ component: "div" }}
            navProps={{
                // added a button since there **has** to be something focusable in the
                // nav when the temporary layout is chosen
                children: <CloseButton />,
            }}
        >
            <Grid columns={1} className={styles.container}>
                <Checkbox
                    id="visibility"
                    label="Toggleable default visible?"
                    checked={defaultVisible}
                    onChange={(event) => defaultVisible(event.currentTarget.checked)}
                    className={styles.center}
                />
                <Select
                    id="desktop-layout"
                    label="Desktop Layout"
                    value={desktopLayout}
                    options={options}
                    onChange={(nextValue) => {
                        if (options.includes(nextValue as SupportedWideLayout)) {
                            desktopLayout(nextValue as SupportedWideLayout)
                        }
                    }}
                    className={cn(styles.center, styles.select)}
                />
                <LayoutVisibility />
            </Grid>
        </Layout>
    )
}
