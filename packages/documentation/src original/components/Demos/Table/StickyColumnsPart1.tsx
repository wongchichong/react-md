import type { ReactElement } from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHeader,
    TableRow,
} from "@react-md/table"

import styles from "./StickyColumnsPart1.module.scss"

export default function StickyColumnsPart1(): Child {
    return (
        <TableContainer className={styles.container}>
            <Table fullWidth>
                <TableHeader sticky>
                    <TableRow>
                        <TableCell>Header 1</TableCell>
                        <TableCell>Header 2</TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.from({ length: 20 }, (_, i) => (
                        <TableRow key={i}>
                            <TableCell>{`Row ${i + 1} Cell 1`}</TableCell>
                            <TableCell>{`Row ${i + 1} Cell 2`}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
