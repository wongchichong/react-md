import type { ReactElement } from 'voby'

import { TabPanel, TabPanels, Tabs, TabsManager } from "@react-md/tabs"

import ConfigurationForm from "./ConfigurationForm"
import PanelContent from "./PanelContent"
import useConfiguration from "./useConfiguration"
import styles from "./ConfigurableTabs.module.scss"

export default function ConfigurableTabs(): Child {
    const { tabs, ...configuration } = useConfiguration()
    const {
        themed,
        padded,
        automatic,

        stacked,
        iconAfter,

        persistent,
        customTransition,
        disableTransition,
    } = configuration

    return (
        <>
            <ConfigurationForm {...configuration} />
            <div className={styles.container}>
                <TabsManager
                    tabsId="configurable-tabs"
                    tabs={tabs}
                    stacked={stacked}
                    iconAfter={iconAfter}
                >
                    <Tabs
                        automatic={automatic}
                        padded={padded}
                        className={cn(styles.tabs, {
                            [styles.themed]: themed,
                        })}
                    />
                    <TabPanels
                        disableTransition={disableTransition || customTransition}
                        persistent={persistent}
                    >
                        {tabs.map((_, i) => (
                            <TabPanel key={i} className={styles.content}>
                                <PanelContent i={i} customTransition={customTransition} />
                            </TabPanel>
                        ))}
                    </TabPanels>
                </TabsManager>
            </div>
        </>
    )
}
