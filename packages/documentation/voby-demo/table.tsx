import {
    TableContainer,
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableCell,
  } from "@react-md/table";
import { render } from "voby";
import "@react-md/table/dist/styles.scss"

const table = () => {
    return (
        <>
            <TableContainer>
                <Table lineWrap="padded" fullWidth>
                    <TableHeader ariaSort={"ascending"}>
                        <TableRow>
                            <TableCell>Header 1</TableCell>
                            <TableCell>Header 2</TableCell>
                            <TableCell>Header 3</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array.from({ length: 10 }, (_, i) => (
                            <TableRow>
                                <TableCell>{`Cell 1, row ${i + 1}`}</TableCell>
                                <TableCell>{`Cell 2, row ${i + 1}`}</TableCell>
                                <TableCell>{`Cell 3, row ${i + 1}`}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

render(table, document.body)