import React from 'react'
import type { ReactElement, ReactNode } from "react"
import { AppBar, AppBarAction } from "@react-md/app-bar"
import { Button } from "@react-md/button"
import type { DialogProps } from "@react-md/dialog"
import { Dialog, DialogContent } from "@react-md/dialog"
import { TextIconSpacing } from "@react-md/icon"
import { CloseSVGIcon, LaunchSVGIcon } from "@react-md/material-icons"
import { Typography } from "@react-md/typography"

import AppBarTitle from "../components/AppBarTitle"

type AllowedDialogProps = Omit<
    DialogProps,
    "aria-label" | "aria-labelledby" | "onRequestClose" | "title"
>

export interface ConditionalFullPageDialogProps extends AllowedDialogProps {
    title?: ReactNode
    children: ReactElement
    enable: () => void
    disable: () => void
    disabled?: FunctionMaybe<Nullable<boolean>>
    disableAppBar?: FunctionMaybe<Nullable<boolean>>
    disableContent?: FunctionMaybe<Nullable<boolean>>
    disableFocusOnMount?: FunctionMaybe<Nullable<boolean>>
}

export default function ConditionalFullPageDialog({
    id,
    title = "Full Page Demo",
    children,
    enable,
    disable,
    visible,
    disabled = false,
    disableAppBar = false,
    disableContent = false,
    disableFocusOnMount = false,
    ...props
}: ConditionalFullPageDialogProps): Child {
    if (disabled) {
        return children
    }

    return (
        <>
            <Typography type="headline-6">
                This example requires a more screen real estate than what is available
                so you will need to open it in a full page dialog.
            </Typography>
            <Button
                id={`${id}-dialog-toggle`}
                themeType="contained"
                onClick={enable}
                theme="primary"
            >
                <TextIconSpacing icon={<LaunchSVGIcon />}>Launch</TextIconSpacing>
            </Button>
            <Dialog
                {...props}
                id={`${id}-dialog`}
                aria-labelledby={`${id}-dialog-title`}
                visible={visible}
                onRequestClose={disable}
                type="full-page"
                disableFocusContainer={disableFocusOnMount}
            >
                {!disableAppBar && (
                    <AppBar>
                        <AppBarTitle keyline id={`${id}-dialog-title`}>
                            {title}
                        </AppBarTitle>
                        <AppBarAction first aria-label="Close" onClick={disable}>
                            <CloseSVGIcon />
                        </AppBarAction>
                    </AppBar>
                )}
                {disableContent ? (
                    children
                ) : (
                    <DialogContent disablePadding>{children}</DialogContent>
                )}
            </Dialog>
        </>
    )
}
