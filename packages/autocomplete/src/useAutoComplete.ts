import {
    $$,
    CSSProperties,
    Observable,
    ObservableMaybe,
    mergeStyles,
} from 'voby'
import { $, useEffect } from 'voby'
import type { ListElement } from "@react-md/list"
import type { FixedPositioningTransitionCallbacks } from "@react-md/transition"
import { useFixedPositioning } from "@react-md/transition"
import type { ItemRefList } from "@react-md/utils"
import {
    MovementPresets,
    scrollIntoView,
    useActiveDescendantMovement,
    useCloseOnOutsideClick,
    useEnsuredRef,
    useIsUserInteractionMode,
    useToggle,
} from "@react-md/utils"

import type {
    AutoCompleteData,
    AutoCompleteListboxPositionOptions,
    AutoCompleteProps,
} from "./types"
import { getFilterFunction } from "./utils"

type EventHandlers = Pick<
    HTMLAttributes<HTMLInputElement>,
    "onBlur" | "onFocus" | "onChange" | "onClick" | "onKeyDown"
>

export type RequiredAutoCompleteProps = Required<
    Pick<
        AutoCompleteProps,
        | "data"
        | "filter"
        | "filterOptions"
        | "filterOnNoValue"
        | "valueKey"
        | "getResultId"
        | "getResultValue"
        | "clearOnAutoComplete"
    >
>

export type OptionalAutoCompleteProps = Pick<
    AutoCompleteProps,
    "onAutoComplete" | "disableShowOnFocus"
>

export interface AutoCompleteOptions
    extends EventHandlers,
    OptionalAutoCompleteProps,
    RequiredAutoCompleteProps,
    AutoCompleteListboxPositionOptions {
    isListAutocomplete: boolean
    isInlineAutocomplete: boolean
    forwardedRef?: Refs<HTMLInputElement>
    suggestionsId: string
    propValue?: FunctionMaybe<Nullable<string>>
    defaultValue?: FunctionMaybe<Nullable<string>>
}


export interface AutoCompleteReturnValue {
    ref: (instance: HTMLInputElement | null) => void
    match: FunctionMaybe<string>
    value: FunctionMaybe<string>
    visible: FunctionMaybe<boolean>
    activeId: ObservableMaybe<string>
    itemRefs: ItemRefList<HTMLLIElement>
    filteredData: readonly AutoCompleteData[]
    listboxRef: Observable<ListElement>
    handleBlur: FocusEventHandler<HTMLInputElement>
    handleFocus: FocusEventHandler<HTMLInputElement>
    handleClick: MouseEventHandler<HTMLInputElement>
    handleChange: JSX.ChangeEventHandler<HTMLInputElement>
    handleKeyDown: KeyboardEventHandler<HTMLInputElement>
    handleAutoComplete: (index: number) => void
    fixedStyle: CSSProperties | undefined
    transitionHooks: Required<FixedPositioningTransitionCallbacks>
}

/**
 * This hook handles all the autocomplete's "logic" and behavior.
 *
 * @internal
 */
export function useAutoComplete({
    suggestionsId,
    data: dt,
    propValue,
    defaultValue = "",
    filter: filterFn,
    filterOptions: fo,
    filterOnNoValue,
    valueKey: vk,
    getResultId,
    getResultValue,
    onBlur,
    onFocus,
    onClick,
    onChange,
    onKeyDown,
    forwardedRef,
    onAutoComplete,
    clearOnAutoComplete,
    anchor,
    xMargin,
    yMargin,
    vwMargin,
    vhMargin,
    transformOrigin,
    listboxWidth,
    listboxStyle,
    preventOverlap,
    disableSwapping,
    disableVHBounds,
    closeOnResize,
    closeOnScroll,
    disableShowOnFocus: propDisableShowOnFocus,
    isListAutocomplete,
    isInlineAutocomplete,
}: AutoCompleteOptions): AutoCompleteReturnValue {
    const valueKey = $$(vk), data = $$(dt), filterOptions = $$(fo)
    const [ref, refHandler] = useEnsuredRef(forwardedRef)

    const filter = getFilterFunction(filterFn)
    const state = $($$(() => {
        const options = {
            ...filterOptions,
            valueKey,
            getItemValue: getResultValue,
            startsWith: filterOptions?.startsWith ?? isInlineAutocomplete,
        }
        const value = $$(propValue ?? defaultValue)
        const filteredData =
            filterOnNoValue || value ? filter(value, data, options) : data

        let match = value
        if (isInlineAutocomplete && filteredData.length) {
            match = getResultValue(filteredData[0], valueKey)
        }

        return {
            value,
            match,
            filteredData,
        }
    }))

    const { value: stateValue, match, filteredData: stateFilteredData } = state()

    const filteredData = filterFn === "none" ? data : stateFilteredData
    const startsWith = filterOptions?.startsWith ?? isInlineAutocomplete
    const value = propValue ?? stateValue

    const setValue = (nextValue: string) => {
        const isBackspace =
            value.length > nextValue.length ||
            (!!match && value.length === nextValue.length)

        let filtered = data
        if (nextValue || filterOnNoValue) {
            const options = {
                ...filterOptions,
                valueKey,
                getItemValue: getResultValue,
                startsWith,
            }

            filtered = filter(nextValue, data, options)
        }

        let nextMatch = nextValue
        if (isInlineAutocomplete && filtered.length && !isBackspace) {
            nextMatch = getResultValue(filtered[0], valueKey)

            const input = ref()
            if (input && !isBackspace) {
                input.value = nextMatch
                input.setSelectionRange(nextValue.length, nextMatch.length)
            }
        }

        state({ value: nextValue, match: nextMatch, filteredData: filtered })
    }

    // this is really just a hacky way to make sure that once a value has been
    // autocompleted, the menu doesn't immediately re-appear due to the hook below
    // for showing when the value/ filtered data list change
    const autocompleted = $(false)

    const handleChange = $((event: JSX.TargetedChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            //@ts-ignore
            onChange(event)
        }

        autocompleted(false)
        //@ts-ignore
        setValue(event.currentTarget.value)
    })

    const [visible, show, hide] = useToggle(false)
    const isTouch = useIsUserInteractionMode("touch")
    const disableShowOnFocus = propDisableShowOnFocus ?? isTouch

    const focused = $(false)
    const handleBlur = $((event: JSX.TargetedFocusEvent<HTMLInputElement>) => {
        if (onBlur) {
            onBlur(event)
        }

        focused(false)
    })
    const handleFocus = $((event: JSX.TargetedFocusEvent<HTMLInputElement>) => {
        if (onFocus) {
            onFocus(event)
        }

        if (disableShowOnFocus) {
            return
        }

        focused(true)
        if (isListAutocomplete && filteredData.length) {
            show()
        }
    })
    const handleClick = $((event: JSX.TargetedMouseEvent<HTMLInputElement>) => {
        if (onClick) {
            onClick(event)
        }

        // since click events also trigger focus events right beforehand, want to
        // skip the first click handler and require a second click to show it.
        // this is why the focused.current isn't set onFocus for
        // disableShowOnFocus
        if (disableShowOnFocus && !focused()) {
            focused(true)
            return
        }

        if (isListAutocomplete && filteredData.length) {
            show()
        }
    })

    const handleAutoComplete = (index: number) => {
        const result = filteredData[index]
        const resultValue = getResultValue(result, valueKey)
        if (onAutoComplete) {
            onAutoComplete({
                value: resultValue,
                index,
                result,
                dataIndex: data.findIndex(
                    (datum) => getResultValue(datum, valueKey) === resultValue
                ),
                filteredData,
            })
        }

        setValue(clearOnAutoComplete ? "" : resultValue)
        autocompleted(true)
    }

    const nodeRef = $<ListElement | null>(null)
    const {
        activeId,
        itemRefs,
        onKeyDown: handleKeyDown,
        focusedIndex,
    } = useActiveDescendantMovement<
        AutoCompleteData,
        HTMLInputElement,
        HTMLLIElement
    >({
        ...MovementPresets.VERTICAL_COMBOBOX,
        getId: getResultId,
        items: filteredData,
        baseId: suggestionsId,
        onChange({ index, items, target }, itemRefs) {
            // the default scroll into view behavior for aria-activedescendant
            // movement won't work here since the "target" element will actually be
            // the input element instead of the listbox. So need to implement the
            // scroll into view behavior manually from the listbox instead.
            const item = itemRefs[index] && itemRefs[index]()
            const listbox = nodeRef()
            if (item && listbox && listbox.scrollHeight > listbox.offsetHeight) {
                scrollIntoView(listbox, item)
            }

            if (!isInlineAutocomplete) {
                return
            }

            const nextMatch = getResultValue(items[index], valueKey)
            target.value = nextMatch
            target.setSelectionRange(0, nextMatch.length)
            state((prevState) => ({
                ...prevState,
                value: nextMatch,
                match: nextMatch,
            }))
        },
        onKeyDown(event) {
            if (onKeyDown) {
                onKeyDown(event)
            }

            const input = event.currentTarget
            switch (event.key) {
                case "ArrowDown":
                    if (
                        isListAutocomplete &&
                        event.altKey &&
                        !visible &&
                        filteredData.length
                    ) {
                        // don't want the cursor to move if there is text
                        event.preventDefault()
                        event.stopPropagation()
                        show()
                        focusedIndex(-1)
                    }
                    break
                case "ArrowUp":
                    if (isListAutocomplete && event.altKey && visible) {
                        // don't want the cursor to move if there is text
                        event.preventDefault()
                        event.stopPropagation()
                        hide()
                    }
                    break
                case "Tab":
                    event.stopPropagation()
                    hide()
                    break
                case "ArrowRight":
                    if (
                        isInlineAutocomplete &&
                        input.selectionStart !== input.selectionEnd
                    ) {
                        const index = focusedIndex() !== -1 ? focusedIndex() : 0
                        hide()
                        handleAutoComplete(index)
                    }
                    break
                case "Enter":
                    if (visible && focusedIndex() >= 0) {
                        event.stopPropagation()
                        handleAutoComplete(focusedIndex())
                        hide()
                    }
                    break
                case "Escape":
                    if (visible) {
                        event.stopPropagation()
                        hide()
                    } else if (value) {
                        event.stopPropagation()
                        setValue("")
                    }
                    break
                // no default
            }
        },
    })

    useCloseOnOutsideClick({ enabled: visible as any, element: ref(), onOutsideClick: hide, })

    const { ref: listboxRef, style, callbacks, updateStyle, } = useFixedPositioning({
        fixedTo: ref,
        nodeRef,
        anchor,
        onScroll(_event, { visible }) {
            if (closeOnScroll || !visible) {
                hide()
            }
        },
        onResize: closeOnResize ? hide : undefined,
        width: listboxWidth,
        xMargin,
        yMargin,
        vwMargin,
        vhMargin,
        transformOrigin,
        preventOverlap,
        disableSwapping,
        disableVHBounds,
    })

    useEffect(() => {
        if (!focused() || autocompleted()) {
            return
        }

        if (filteredData.length && !visible && value.length && isListAutocomplete) {
            show()
        } else if (!filteredData.length && visible) {
            hide()
        }

        // this effect is just for toggling the visibility states as needed if the
        // value or filter data list changes
        // eslint-disable-next-line react-hooks/exhaustive-deps
    })

    useEffect(() => {
        if (!visible) {
            focusedIndex(-1)
            return
        }

        updateStyle()

        // only want to trigger on data changes and setFocusedIndex shouldn't change
        // anyways
        // eslint-disable-next-line react-hooks/exhaustive-deps
    })

    return {
        ref: refHandler,
        value,
        match,
        visible,
        activeId,
        itemRefs,
        filteredData,
        fixedStyle: mergeStyles($$(style), $$(listboxStyle)),
        transitionHooks: callbacks,
        listboxRef: listboxRef as any,
        handleBlur,
        handleFocus,
        handleClick,
        handleChange,
        handleKeyDown,
        handleAutoComplete,
    }
}
