import {
     $$,
    // JSX.TargetedFocusEvent,
    // HTMLAttributes,
    // JSX.TargetedKeyboardEvent,
    // JSX.TargetedMouseEvent,
    // Child,
} from 'voby'
import { $, useMemo } from 'voby'

import { loop } from "../../loop"
import type { LabelA11y, LabelRequiredForA11y } from "../../types"
import { tryToSubmitRelatedForm } from "../tryToSubmitRelatedForm"
import { RadioWidget } from "./RadioWidget"
import type {
    RadioWidgetAttributes,
    RadioItemStyleObject,
    RadioItem,
} from "./types"
import {
    defaultGetRadioClassName,
    defaultGetRadioStyle,
    getRadioItemValue,
} from "./utils"

/**
 * This is a controlled component to render a group of radio buttons when the
 * `<input type="radio">` does not work.
 *
 * @remarks \@since 2.7.0
 */
export interface BaseRadioGroupProps
    extends Omit<HTMLAttributes<HTMLSpanElement>, "onChange"> {
    /**
     */
    id: FunctionMaybe<string>

    /**
     * The current value for the radio group. This should be the empty string
     * (`""`) if no values are selected. Otherwise it should match one of the
     * `values`' value.
     */
    value: FunctionMaybe<string>

    /**
     * A list of values/radio props that should be used to render the radio items.
     */
    items: FunctionMaybe<readonly RadioItem[]>

    /**
     * A function that changes the current selection within the radio group.
     */
    onChange(nextValue: FunctionMaybe<string>): void

    /**
     * An optional function to get a `style` object for each rendered radio.
     */
    getRadioStyle?(item: RadioItemStyleObject): FunctionMaybe<string | StyleProperties>

    /**
     * An optional function to get a `className` for each rendered radio.
     */
    getRadioClassName?(item: RadioItemStyleObject): Class
}

/**
 * @remarks \@since 2.7.0
 */
export type RadioGroupProps = LabelRequiredForA11y<
    BaseRadioGroupProps & LabelA11y
>

/**
 * The `RadioGroup` is a low-level component that does not provide any styles
 * and instead only provides the accessibility required for a
 * `role="radiogroup"` and rendering each `role="radio"` item.
 *
 * @remarks \@since 2.7.0
 */
export const RadioGroup = ({
    id,
    getRadioStyle = defaultGetRadioStyle,
    getRadioClassName = defaultGetRadioClassName,
    items: is,
    value: currentValue,
    onBlur,
    onFocus,
    onClick,
    onChange,
    onKeyDown,
    ref,
    ...props
}: RadioGroupProps,
) => {
    const items = $$(is)

    const refs = items.map(() => $<HTMLSpanElement>())
    const focused = $(false)
    const handleBlur = (event: JSX.TargetedFocusEvent<HTMLSpanElement>) => {
        onBlur?.(event)
        focused(false)
    }
    const handleFocus = (event: JSX.TargetedFocusEvent<HTMLSpanElement>) => {
        onFocus?.(event)
        focused(true)
    }
    const handleClick = (event: JSX.TargetedMouseEvent<HTMLSpanElement>) => {
        //@ts-ignore
        onClick?.(event)

        /* istanbul ignore next: can't really happen */
        const radio = (event.target as HTMLElement)?.closest<HTMLSpanElement>(
            '[role="radio"]'
        )
        const index = radio
            ? refs.findIndex(r => radio === r())
            : -1
        if (index !== -1) {
            onChange(getRadioItemValue(items[index]))
            /* istanbul ignore next: can't really happen */
            refs[index]().focus()
        }
    }

    const handleKeyDown = $((event: JSX.TargetedKeyboardEvent<HTMLSpanElement>) => {
        //@ts-ignore
        onKeyDown?.(event)

        if (tryToSubmitRelatedForm(event)) {
            return
        }

        if (![" ", "ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"].includes(event.key)) {
            return
        }

        /* istanbul ignore next: can't really happen */
        const radio = (event.target as HTMLElement)?.closest<HTMLSpanElement>(
            '[role="radio"]'
        ) as HTMLSpanElement

        if (!radio) {
            return
        }

        event.preventDefault()
        event.stopPropagation()
        if (event.key === " ") {
            radio.click()
            return
        }

        const increment =
            event.key === "ArrowRight" || event.key === "ArrowDown"
        const index = refs.findIndex(r => r() === radio)
        /* istanbul ignore next: can't really happen */
        if (index !== -1) {
            const nextIndex = loop({
                value: index,
                max: items.length - 1,
                increment,
            })
            refs[nextIndex]().focus()
            onChange(getRadioItemValue(items[nextIndex]))
        }
    })

    const focusable = useMemo(() => items.some((value) => getRadioItemValue(value) === currentValue))

    return (
        <span
            {...props}
            id={id}
            ref={ref}
            role="radiogroup"
            onBlur={handleBlur}
            onFocus={handleFocus}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            tabIndex={-1}
        >
            {items.map((item, i) => {
                let props: RadioWidgetAttributes | undefined
                let value: FunctionMaybe<string>
                let checked = false
                let children: JSX.Children
                let itemStyle: FunctionMaybe<string | StyleProperties> //CSSProperties | undefined
                let itemClassName: Class //string | undefined
                if (typeof item === "string") {
                    value = item
                    checked = currentValue === value
                    children = value
                    itemStyle = getRadioStyle({ index: i, checked, value: item })
                    itemClassName = getRadioClassName({
                        index: i,
                        checked,
                        value: item,
                    })
                } else {
                    ({ value, children, ...props } = item)
                    checked = currentValue === value
                    //@ts-ignore
                    itemStyle = getRadioStyle({ index: i, checked, ...item })
                    itemClassName =
                        getRadioClassName({
                            index: i,
                            //@ts-ignore
                            checked,
                            ...item,
                        }) || undefined

                    if (typeof children === "undefined") {
                        children = value
                    }
                }

                return (
                    <RadioWidget
                        {...props}
                        id={value}
                        // id={`${id}-${i + 1}`}
                        ref={refs[i]}
                        style={itemStyle}
                        className={itemClassName}
                        checked={checked}
                        tabIndex={checked || (!focused && !focusable) ? 0 : -1}
                    >
                        {children}
                    </RadioWidget>
                )
            })}
        </span>
    )
}
