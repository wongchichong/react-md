import type { ReactElement, ReactNode } from 'voby'
import { useEffect, $ } from 'voby'
import type { ConfiguredIcons } from "@react-md/icon"
import type { LayoutConfiguration } from "@react-md/layout"
import '@react-md/react'

import { 
 Configuration, 
 Layout as RMDLayout, 
 useLayoutNavigation, 
 } from "@react-md/layout"
import { 
 ArrowDropDownSVGIcon, 
 ArrowUpwardSVGIcon, 
 CheckBoxSVGIcon, 
 CheckSVGIcon, 
 ErrorOutlineSVGIcon, 
 FileUploadSVGIcon, 
 KeyboardArrowDownSVGIcon, 
 KeyboardArrowLeftSVGIcon, 
 KeyboardArrowRightSVGIcon, 
 MenuSVGIcon, 
 NotificationsSVGIcon, 
 RadioButtonCheckedSVGIcon, 
 RemoveRedEyeSVGIcon, 
 } from "@react-md/material-icons"
import type { MenuConfiguration } from "@react-md/menu"
import { useCrossFadeTransition } from "@react-md/transition"
import type { AppSizeListenerProps } from "@react-md/utils"
import { useIsomorphicLayoutEffect } from "@react-md/utils"

import type { CodePreference } from "components/CodePreference"
import { CodePreferenceProvider } from "components/CodePreference"
import { IdProvider } from "components/IdProvider"
import LinkUnstyled from "components/LinkUnstyled"
import TableOfContents from "components/TableOfContents"
import { TOCVisibilityProvider } from "components/TableOfContents/VisibilityContext"
import navItems from "constants/navItems"

import Actions from "./Actions"
import { Provider } from "./fixedAppBarContext"
import NavHeaderTitle from "./NavHeaderTitle"

export interface LayoutProps
    extends Required<Pick<AppSizeListenerProps, "defaultSize">> {
    title: string
    pathname: string
    children: Children
    defaultPreference: CodePreference
}

const icons: ConfiguredIcons = {
    back: <KeyboardArrowLeftSVGIcon />,
    checkbox: <CheckBoxSVGIcon />,
    dropdown: <ArrowDropDownSVGIcon />,
    expander: <KeyboardArrowDownSVGIcon />,
    error: <ErrorOutlineSVGIcon />,
    forward: <KeyboardArrowRightSVGIcon />,
    menu: <MenuSVGIcon />,
    notification: <NotificationsSVGIcon />,
    radio: <RadioButtonCheckedSVGIcon />,
    password: <RemoveRedEyeSVGIcon />,
    selected: <CheckSVGIcon />,
    sort: <ArrowUpwardSVGIcon />,
    upload: <FileUploadSVGIcon />,
}

const menuConfiguration: Readonly<MenuConfiguration> = {
    renderAsSheet: "phone",
}

let devLayoutConf: LayoutConfiguration | undefined
if (process.env.NODE_ENV !== "production") {
    devLayoutConf = {
        landscapeTabletLayout: "temporary",
        desktopLayout: "temporary",
        largeDesktopLayout: "temporary",
    }
}

export default function Layout({
    children,
    title,
    pathname,
    defaultSize,
    defaultPreference,
}: LayoutProps): Child {
    const elevated = $(pathname !== "/")
    const rendered = $(false)
    useEffect(() => {
        if (!rendered()) {
            rendered(true)
            return
        }

        elevated(pathname !== "/")
    })

    const prevPathname = $(pathname)
    const { elementProps, transitionTo } = useCrossFadeTransition()
    useIsomorphicLayoutEffect(() => {
        if (prevPathname(pathname)) {
            return
        }

        // since the sandbox route is a full page modal, don't want to transition
        // to make it appear smoother between the two
        const isTransitionable =
            !prevPathname().startsWith("/sandbox") &&
            !pathname.startsWith("/sandbox")

        prevPathname(pathname)
        if (isTransitionable) {
            transitionTo("enter")
        }
    })

    return (
        <Configuration
            icons={icons}
            defaultSize={defaultSize}
            menuConfiguration={menuConfiguration}
        >
            <TOCVisibilityProvider pathname={pathname}>
                <IdProvider>
                    <CodePreferenceProvider defaultPreference={defaultPreference}>
                        <RMDLayout
                            appBarProps={{
                                fixedElevation: elevated(),
                                children: <Actions />,
                            }}
                            title={title.replace("react-md@v2 - ", "")}
                            mainProps={elementProps}
                            treeProps={useLayoutNavigation(
                                navItems,
                                // I don't add each blog to the navigation tree, but still want to
                                // show that a blog is being viewed
                                pathname.replace(/^\/blog.*$/, "/blog"),
                                LinkUnstyled
                            )}
                            navHeaderProps={{ children: <NavHeaderTitle /> }}
                            {...devLayoutConf}
                        >
                            <TableOfContents pathname={pathname} />
                            <Provider value={setElevated}>{children}</Provider>
                        </RMDLayout>
                    </CodePreferenceProvider>
                </IdProvider>
            </TOCVisibilityProvider>
        </Configuration>
    )
}
