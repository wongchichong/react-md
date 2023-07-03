import type { ReactElement } from "react"

import type { AppBarProps } from "@react-md/app-bar"
import { AppBar } from "@react-md/app-bar"
import { useAppSize } from "@react-md/utils"

import { usePhoneContext } from "./context"
import StatusBar from "./StatusBar"

import styles from "./PhoneAppBar.module.scss"

export default function PhoneAppBar({
    className,
    children,
    height: propHeight,
    ...props
}: AppBarProps): Child {
    const { id } = usePhoneContext()
    const { isPhone } = useAppSize()

    let height = propHeight ?? (isPhone ? "normal" : "dense")
    if (!isPhone && height === "prominent") {
        // I don't have automatic dense spec in css for this since it makes demos
        // difficult, so have to do it in js
        height = "prominent-dense"
    }

    return (
        <AppBar
            {...props}
            id={`${id}-app-bar`}
            className={cn(
                styles.container,
                {
                    [styles.emulated]: !isPhone,
                },
                className
            )}
            height={height}
            fixed
            fixedElevation={false}
        >
            <StatusBar id={id} isPhone={isPhone} />
            {children}
        </AppBar>
    )
}

PhoneAppBar.defaultProps = {
    theme: "default",
}
