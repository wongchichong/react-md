import type { ReactElement } from 'voby'


import Code from "components/Code"

import styles from "./AllElevations.module.scss"

export default function AllElevations(): Child {
    return (
        <ul className={styles.container}>
            {Array.from({ length: 25 }).map((_, elevation) => (
                <li
                    key={elevation}
                    className={cn(styles.example, styles[`elevation${elevation}`])}
                >
                    <Code className={styles.code}>
                        {`@include rmd-elevation(${elevation})`}
                    </Code>
                </li>
            ))}
        </ul>
    )
}
