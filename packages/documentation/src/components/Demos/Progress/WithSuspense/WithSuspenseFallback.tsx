import type { ReactElement } from 'voby'
import { useEffect } from 'voby'
import { LinearProgress } from "@react-md/progress"
import { Typography } from "@react-md/typography"

import styles from "./WithSuspenseFallback.module.scss"

interface WithSuspenseFallbackProps {
    complete: () => void
}

export default function WithSuspenseFallback({
    complete,
}: WithSuspenseFallbackProps): Child {
    // trigger the complete action when this component unmounts
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => () => complete())

    return (
        <div className={styles.container}>
            <Typography type="headline-6" className={styles.title}>
                Getting your files
            </Typography>
            <LinearProgress id="with-suspense-loading" />
        </div>
    )
}
