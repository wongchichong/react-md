import type { CSSProperties, ObservableMaybe } from 'voby'
import { $, $$ } from 'voby'
import { applyRef } from "@react-md/utils"

/** @remarks \@since 5.0.0 */
export interface VerticalDividerHookOptions<E extends HTMLElement> {
    /**
     * An optional ref to merge with the returned ref.
     */
    ref?: JSX.Refs<E>

    /**
     * An optional style object to merge with the divider's height style.
     */
    style?: FunctionMaybe<string | StyleProperties>

    /**
     * The max height for the vertical divider. When this is `<= 0`, the hook will
     * be disabled.
     *
     * When the value is between 0 and 1, it will be used as a multiplier with the
     * parent element's height. When the value is greater than 1, it will be used
     * in `Math.min(parentElementHeight, maxHeight)`.
     */
    maxHeight: FunctionMaybe<number>
}

/** @remarks \@since 5.0.0 */
export interface VerticalDividerHeight<E extends HTMLElement> {
    ref: Refs<E>
    style: FunctionMaybe<CSSProperties | undefined>
}

/**
 * This is a small hook that is used to automatically create a vertical divider
 * based on the computed height of its parent element.
 *
 * @param maxHeight - The max height for the vertical divider. When the value is
 * between 0 and 1, it will be used as a percentage. Otherwise the smaller value
 * of parent element height and this will be used.
 * @remarks \@since 5.0.0 The hook accepts an object instead of using multiple
 * params and uses a generic for the HTMLElement type.
 */
export function useVerticalDividerHeight<E extends HTMLElement>({ ref, style, maxHeight: mh, }: VerticalDividerHookOptions<E>): VerticalDividerHeight<E> {
    const height = $<number | undefined>(undefined)
    const maxHeight = $$(mh)
    const Refs = $((instance: E | null) => {
        applyRef(instance, ref)
        if (!instance || !instance.parentElement || maxHeight === 0) {
            return
        }

        const ht = instance.parentElement.offsetHeight
        if (maxHeight <= 1) {
            height(ht * maxHeight)
        } else {
            height(Math.min(ht, maxHeight))
        }
    })

    return {
        ref: Refs,
        //@ts-ignore
        style: maxHeight <= 0 ? style : { ...$$(style), height: height() },
    }
}
