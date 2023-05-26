import { UnstyledButton } from "@react-md/button"
import type { TextIconSpacingProps } from "@react-md/icon"
import { IconRotator, TextIconSpacing } from "@react-md/icon"
import { bem } from "@react-md/utils"

import type { TableCellHorizontalAlignment } from "./config"
import { $$ } from "voby"

export type SortOrder = "ascending" | "descending" | "none" | "other"

export interface TableCellContentProps extends TextIconSpacingProps {
    /**
     * An optional id for the sort order button.
     */
    id?: FunctionMaybe<Nullable<string>>

    /**
     * An optional style for the sort order button.
     */
    style?: FunctionMaybe<Nullable<string | StyleProperties>>

    /**
     * The current sort order for this cell. Setting this to `null` will prevent
     * the button from being rendered.
     */
    sortOrder?: FunctionMaybe<Nullable<  SortOrder>>

    /**
     * Boolean if the icon should be rotated.
     */
    rotated?: FunctionMaybe<Nullable<boolean>>

    /**
     * @remarks \@since 4.0.3
     * @see {@link TableCellHorizontalAlignment}
     */
    hAlign?: FunctionMaybe<Nullable<TableCellHorizontalAlignment>>
}

const block = bem("rmd-table-cell")

/**
 * This is mostly an internal component since it is automatically used within
 * the `TableCell` component but this will conditionally wrap the `children`
 * within an `UnstyledButton` to make a clickable cell. This is really to help
 * with sort behavior within headers.
 */
export const TableCellContent = (
    {
        id,
        icon: propIcon,
        style,
        className,
        sortOrder,
        children,
        rotated: propRotated,
        hAlign = "left",
        //@ts-ignore
        ref,
        ...props
    }: TableCellContentProps //<HTMLButtonElement>
) =>{
    if (!sortOrder || propIcon === null) {
        return <>{children}</>
    }

    let icon: Child = null
    if (sortOrder !== "none") {
        const rotated = propRotated ?? sortOrder === "descending"

        icon = <IconRotator rotated={rotated}>{propIcon}</IconRotator>
    }

    return (
        <UnstyledButton
            id={id}
            ref={ref}
            style={style}
            className={[
                block("child", {
                    [$$(hAlign)]: hAlign !== "left",
                }),
                className
            ]}
        >
            <TextIconSpacing {...props} icon={icon}>
                {children}
            </TextIconSpacing>
        </UnstyledButton>
    )
}
