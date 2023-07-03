import type { ReactElement, ReactNode } from 'voby'
import { TableCell } from "@react-md/table"

import styles from "./TableCellList.module.scss"

interface Props {
    children: Children
}

export default function TableCellList({
    children,
}: Props): ReactElement | null {
    return (
        <TableCell>
            <ul className={styles.list}>{children}</ul>
        </TableCell>
    )
}
