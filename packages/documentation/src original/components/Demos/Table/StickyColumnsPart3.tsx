import type { ReactElement } from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHeader,
    TableRow,
} from "@react-md/table"

const columns = Array.from({ length: 10 }, (_, i) => `Column ${i + 1}`)

export default function StickyColumnsPart3(): Child {
    return (
        <TableContainer style={{ maxHeight: "20rem" }}>
            <Table fullWidth>
                <TableHeader sticky>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell key={column}>{column}</TableCell>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.from({ length: 20 }, (_, i) => (
                        <TableRow key={i}>
                            {columns.map((_, j) => (
                                <TableCell key={j}>{`Row ${i + 1} Cell ${j + 1}`}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter sticky>
                    <TableRow>
                        <TableCell colSpan="100%">
                            This is the sticky footer content. Any components can be rendered
                            inside.
                        </TableCell>
                        <TableCell colSpan={999} />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    )
}
