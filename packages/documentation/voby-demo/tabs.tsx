import { TabsManager, Tabs, TabPanels, TabPanel } from "@react-md/tabs";
import { render } from "voby";
import {Typography} from "@react-md/typography"

const tabs = () => {
    const tabs = ["Tab 1", "Tab 2", "Tab 3"];

    return( 
        <>
            <TabsManager tabs={tabs} tabsId="tabs">
                <Tabs />
                <TabPanels>
                    <TabPanel>
                        <Typography type="headline-4">Panel 1</Typography>
                    </TabPanel>
                    <TabPanel>
                        <Typography type="headline-4">Panel 2</Typography>
                    </TabPanel>
                    <TabPanel>
                        <Typography type="headline-4">Panel 3</Typography>
                    </TabPanel>
                </TabPanels>
            </TabsManager>

        </>
    )
}
render(tabs, document.body)