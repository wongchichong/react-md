import type { ReactElement } from 'voby'
import type { 
 TableCellConfiguration, 
 TableRowConfiguration,  } from "@react-md/table"
import { 
 Caption, 
 Table, 
 TableBody, 
 TableCell, 
 TableContainer, 
 TableHeader, 
 TableRow,  } from "@react-md/table"

import { useDefaultStylesContext } from "./context"
import styles from "./StyledTable.module.scss"

interface ContainerProps {
    container: boolean
    children: ReactElement
}

type RowProps = Required<TableRowConfiguration> | undefined
type CellProps = Required<TableCellConfiguration> | undefined

function Container({ container, children }: ContainerProps): Child {
    if (!container) {
        return children
    }

    return (
        <TableContainer className={styles.container}>{children}</TableContainer>
    )
}

export default function StyledTable(): Child {
    const {
        rows,
        cols,
        container,
        row2DisableHover,
        row2DisableBorders,
        col2Grow,
        cellHAlign,
        cellVAlign,
        cellLineWrap,
        onInputChange: _onInputChange,
        onNumberChange: _onNumberChange,
        onSelectChange: _onSelectChange,
        ...props
    } = useDefaultStylesContext()

    const getRowProps = (rowIndex: number): RowProps => {
        if (rowIndex !== 1) {
            return undefined
        }

        return {
            disableHover: row2DisableHover,
            disableBorders: row2DisableBorders,
        }
    }

    const getCellProps = (rowIndex: number, colIndex: number): CellProps => {
        if (rowIndex !== 0 || colIndex !== 1) {
            return undefined
        }

        return {
            hAlign: cellHAlign,
            vAlign: cellVAlign,
            lineWrap: cellLineWrap,
        }
    }

    return (
        <Container container={container}>
            <Table {...props} className={styles.table}>
                <Caption>Configured Table</Caption>
                <TableHeader>
                    <TableRow>
                        {Array.from({ length: cols }, (_, colIndex) => (
                            <TableCell key={colIndex} grow={col2Grow && colIndex === 1}>
                                {`Header ${colIndex + 1}`}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.from({ length: rows }, (_, rowIndex) => (
                        <TableRow key={rowIndex} {...getRowProps(rowIndex)}>
                            {Array.from({ length: cols }, (_, colIndex) => (
                                <TableCell
                                    key={colIndex}
                                    className={styles.cell}
                                    {...getCellProps(rowIndex, colIndex)}
                                >
                                    {`Cell ${rowIndex + 1}-${colIndex + 1}`}
                                    {colIndex === 1 && " - This is some additional text."}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    )
}
