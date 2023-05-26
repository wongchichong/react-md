import type { ReactElement } from "react"
import { Button } from "@react-md/button"

import styles from "./CustomInteractions.module.scss"

export default function CustomInteractions(): Child {
    return (
        <Button
            id="custom-state-button"
            enablePressedAndRipple
            className={styles.button}
        >
            Button
        </Button>
    )
}
