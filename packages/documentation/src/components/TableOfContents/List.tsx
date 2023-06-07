/* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */
import type { ReactElement } from 'voby'
import { $ } from 'voby'
import { Link } from "@react-md/link"

import type { TOCAnchor } from "constants/meta/types"

import styles from "./List.module.scss"

export interface ListProps {
    anchors: readonly TOCAnchor[]
    isLargeDesktop: boolean
    onRequestClose: () => void
}

export default function List({
    anchors,
    isLargeDesktop,
    onRequestClose,
}: ListProps): Child {
    const handleClick = ((event: React.JSX.TargetedMouseEvent<HTMLUListElement>) => {
            if (
                !isLargeDesktop &&
                event.target &&
                event.target !== event.currentTarget
            ) {
                onRequestClose()
            }
        })

    return (
        <ul onClick={handleClick} className={styles.list}>
            {anchors.map(({ anchor, title }) => (
                <li key={anchor} className={styles.item}>
                    <Link href={anchor}>{title}</Link>
                </li>
            ))}
        </ul>
    )
}
