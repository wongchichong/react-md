import type { ReactElement } from 'voby'

import { AppBar } from "@react-md/app-bar"
import { 
 NetworkWifiSVGIcon, 
 NetworkCellSVGIcon, 
 BatteryFullSVGIcon,  } from "@react-md/material-icons"

import styles from "./StatusBar.module.scss"

export interface StatusBarProps {
    id: string
    isPhone: boolean
}

export default function StatusBar({
    id,
    isPhone,
}: StatusBarProps): ReactElement | null {
    if (isPhone) {
        return null
    }

    return (
        <AppBar
            id={`${id}-status-bar`}
            className={styles.container}
            height="dense"
            theme="clear"
            component="div"
        >
            <NetworkWifiSVGIcon
                role="presentation"
                className={cn(styles.icon, styles.first)}
            />
            <NetworkCellSVGIcon role="presentation" className={styles.icon} />
            <BatteryFullSVGIcon role="presentation" className={styles.icon} />
        </AppBar>
    )
}
