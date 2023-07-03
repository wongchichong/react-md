import type { ReactElement, ReactNode } from 'voby'
import { Card } from "@react-md/card"

import styles from "./JumpStartCard.module.scss"

export interface JumpStartCardProps {
    children: Children
}

export default function JumpStartCard({
    children,
}: JumpStartCardProps): Child {
    return <Card className={styles.card}>{children}</Card>
}
