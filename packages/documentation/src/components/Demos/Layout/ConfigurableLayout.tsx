import type { ReactElement } from 'voby'
import { $ } from 'voby'
import type { 
 LayoutNavigationTree, 
 SupportedPhoneLayout, 
 SupportedTabletLayout, 
 SupportedWideLayout,  } from "@react-md/layout"
import { 
 DEFAULT_DESKTOP_LAYOUT, 
 DEFAULT_LANDSCAPE_TABLET_LAYOUT, 
 DEFAULT_PHONE_LAYOUT, 
 DEFAULT_TABLET_LAYOUT, 
 Layout, 
 useLayoutNavigation,  } from "@react-md/layout"
import { 
 HomeSVGIcon, 
 SecuritySVGIcon, 
 SettingsSVGIcon, 
 ShareSVGIcon, 
 SnoozeSVGIcon, 
 StarSVGIcon, 
 StorageSVGIcon,  } from "@react-md/material-icons"

import { ConfigurationForm } from "./ConfigurationForm"
import { CurrentChildren } from "./CurrentChildren"

const navItems: LayoutNavigationTree = {
    "/": {
        itemId: "/",
        parentId: null,
        children: "Home",
        leftAddon: <HomeSVGIcon />,
    },
    "/route-1": {
        itemId: "/route-1",
        parentId: null,
        children: "Route 1",
        leftAddon: <StarSVGIcon />,
    },
    "/divider-1": {
        itemId: "/divider-1",
        parentId: null,
        divider: true,
        isCustom: true,
    },
    "/route-2": {
        itemId: "/route-2",
        parentId: null,
        children: "Route 2",
        leftAddon: <ShareSVGIcon />,
    },
    "/route-2-1": {
        itemId: "/route-2-1",
        parentId: "/route-2",
        children: "Route 2-1",
        leftAddon: <SettingsSVGIcon />,
    },
    "/route-2-2": {
        itemId: "/route-2-2",
        parentId: "/route-2",
        children: "Route 2-2",
        leftAddon: <StorageSVGIcon />,
    },
    "/route-2-3": {
        itemId: "/route-2-3",
        parentId: "/route-2",
        children: "Route 2-3",
        leftAddon: <SecuritySVGIcon />,
    },
    "/route-3": {
        itemId: "/route-3",
        parentId: null,
        children: "Route 3",
        leftAddon: <SnoozeSVGIcon />,
    },
    "/route-4": {
        itemId: "/route-4",
        parentId: null,
        children: "Route 4",
    },
}

export default function ConfigurableLayout(): Child {
    const phoneLayout = $<SupportedPhoneLayout>(DEFAULT_PHONE_LAYOUT)
    const tabletLayout = $<SupportedTabletLayout>(DEFAULT_TABLET_LAYOUT)
    const landscapeTabletLayout = $<SupportedTabletLayout>(DEFAULT_LANDSCAPE_TABLET_LAYOUT)
    const desktopLayout = $<SupportedWideLayout>(DEFAULT_DESKTOP_LAYOUT)
    const largeDesktopLayout = $<SupportedWideLayout>(DEFAULT_DESKTOP_LAYOUT)

    const selectedId = $("/")

    return (
        <Layout
            id="configurable-layout"
            title="Configurable Layout Title"
            navHeaderTitle="Another Title"
            phoneLayout={phoneLayout}
            tabletLayout={tabletLayout}
            landscapeTabletLayout={landscapeTabletLayout}
            desktopLayout={desktopLayout}
            treeProps={{
                ...useLayoutNavigation(navItems, selectedId),
                onItemSelect: setSelectedId,
            }}
            // this is only required since I already have a main element due to the
            // documentation site's Layout component
            mainProps={{ component: "div" }}
        >
            <CurrentChildren route={selectedId} />
            <ConfigurationForm
                phoneLayout={phoneLayout}
                setPhoneLayout={setPhoneLayout}
                tabletLayout={tabletLayout}
                setTabletLayout={setTabletLayout}
                landscapeTabletLayout={landscapeTabletLayout}
                setLandscapeTabletLayout={setLandscapeTabletLayout}
                desktopLayout={desktopLayout}
                setDesktopLayout={setDesktopLayout}
                largeDesktopLayout={largeDesktopLayout}
                setLargeDesktopLayout={setLargeDesktopLayout}
            />
        </Layout>
    )
}
