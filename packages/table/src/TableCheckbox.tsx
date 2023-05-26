import { $$, CSSProperties, ObservableMaybe } from 'voby'


import type { CheckboxProps } from "@react-md/form"
import { Checkbox } from "@react-md/form"

import type { TableCellProps } from "./TableCell"
import { TableCell } from "./TableCell"

type WantedCheckboxProps =
    | "name"
    | "value"
    | "icon"
    | "iconStyle"
    | "iconClassName"
    | "toggleStyle"
    | "toggleClassName"
    | "disableIconOverlay"
    | "checked"
    | "onChange"
    | "defaultChecked"
    | "indeterminate"
    | "aria-controls"

export interface TableCheckboxProps<T extends EventTarget = HTMLTableCellElement>
    extends Omit<TdHTMLAttributes<T>, "onChange" | "scope" | "aria-sort" | 'icon'>,
    Pick<CheckboxProps, WantedCheckboxProps>, Pick<TableCellProps, "sticky"> {
    /**
     * The id for the checkbox. This is required for a11y.
     */
    id: FunctionMaybe<string>

    /**
     * An optional id to provide to the `<td>` element. The base `id` prop is
     * passed to the checkbox input instead.
     */
    cellId?: FunctionMaybe<Nullable<string>>

    /**
     * An screen reader label to use for the checkbox. Either this or the
     * `aria-labelledby` prop are required for a11y.
     *
     * Note: This is defaulted automatically to "Toggle Row Selection".
     */
    "aria-label"?: FunctionMaybe<Nullable<string>>

    /**
     * An optional id or space-delimited list of ids that describe the checkbox.
     * Either this or the `aria-label` props are required for a11y.
     */
    "aria-labelledby"?: FunctionMaybe<Nullable<string>>

    /**
     * An optional `ref` to apply to the checkbox element. The base `ref` is
     * passed to the `<td>` element.
     */
    checkboxRef?: ObservableMaybe<HTMLInputElement>

    /**
     * An optional style to apply to the checkbox. The base `style` is passed to
     * the `<td>`.
     */
    checkboxStyle?: FunctionMaybe<Nullable<string | StyleProperties>>

    /**
     * An optional className to apply to the checkbox. The base `className` is
     * passed to the `<td>`.
     */
    checkboxClassName?: Class
}

const DEFAULT_ARIA_LABEL = "Toggle Row Selection"

/**
 * This is a simple wrapper for the `Checkbox` component that allows you to
 * render a nicely styled `Checkbox` within a `TableCell` element. This will
 * mostly just remove the additional padding applied and default an `aria-label`
 * since you normally don't want a checkbox with a label within a table since
 * it's more for selection.
 */
export const TableCheckbox = (
    {
        cellId,
        className,
        id,
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledBy,
        "aria-checked": ariaChecked,
        "aria-controls": ariaControls,
        checkboxRef,
        checkboxStyle,
        checkboxClassName,
        icon,
        iconStyle,
        iconClassName,
        toggleStyle,
        toggleClassName,
        disableIconOverlay,
        name,
        value,
        checked,
        onChange,
        defaultChecked,
        indeterminate,
        ref,
        ...props
    }: TableCheckboxProps<HTMLTableCellElement> & { "aria-checked" ?:string}
) => {
    return (
        <TableCell
            {...props}
            ref={ref}
            id={cellId}
            header={false}
            className={["rmd-table-cell--checkbox", className]}
        >
            <Checkbox
                id={$$(id)}
                aria-label={
                    ariaLabel ?? ariaLabelledBy ? undefined : DEFAULT_ARIA_LABEL
                }
                aria-labelledby={ariaLabelledBy}
                aria-checked={ariaChecked}
                aria-controls={ariaControls}
                ref={checkboxRef as any}
                style={checkboxStyle}
                indeterminate={indeterminate}
                className={checkboxClassName}
                icon={icon}
                iconStyle={iconStyle}
                iconClassName={iconClassName}
                toggleStyle={toggleStyle}
                toggleClassName={toggleClassName}
                disableIconOverlay={disableIconOverlay}
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
                defaultChecked={defaultChecked}
            />
        </TableCell>
    )
}