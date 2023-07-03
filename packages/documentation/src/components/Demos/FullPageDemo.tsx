import type { ReactElement, ReactNode } from 'voby'
import { AppBar } from "@react-md/app-bar"
import { Button } from "@react-md/button"
import { Dialog, DialogContent } from "@react-md/dialog"
import { TextIconSpacing } from "@react-md/icon"
import { CloseSVGIcon, LaunchSVGIcon } from "@react-md/material-icons"
import { Typography } from "@react-md/typography"
import { useToggle } from "@react-md/utils"

import AppBarAction from "components/AppBarAction"
import AppBarTitle from "components/AppBarTitle"

export interface FullPageDemoProps {
    id: string
    title?: ReactNode
    children: ReactElement
    disabled?: FunctionMaybe<Nullable<boolean>>
    disableAppBar?: FunctionMaybe<Nullable<boolean>>
    disableContent?: FunctionMaybe<Nullable<boolean>>
}

export default function FullPageDemo({
    id,
    title,
    children,
    disabled,
    disableAppBar,
    disableContent,
}: FullPageDemoProps): Child {
    const [visible, show, hide] = useToggle(false)
    if (disabled) {
        return children
    }

    return (
        <>
            <Typography type="headline-6">
                This example requires a more screen real estate than what is available
                so you will need to open it in a full page dialog.
            </Typography>
            <Button id={`${id}-toggle`} themeType="contained" onClick={show}>
                <TextIconSpacing icon={<LaunchSVGIcon />}>Launch</TextIconSpacing>
            </Button>
            <Dialog
                id={`${id}-dialog`}
                aria-labelledby={`${id}-dialog-title`}
                visible={visible}
                onRequestClose={hide}
                type="full-page"
            >
                {!disableAppBar && (
                    <AppBar>
                        <AppBarTitle keyline id={`${id}-dialog-title`}>
                            {title}
                        </AppBarTitle>
                        <AppBarAction
                            id={`${id}-dialog-close`}
                            first
                            aria-label="Close"
                            onClick={hide}
                        >
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

FullPageDemo.defaultProps = {
    title: "Demo",
}
