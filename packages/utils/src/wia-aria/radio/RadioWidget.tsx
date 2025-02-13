// ;
import type { RadioWidgetAttributes } from "./types"

/**
 * @remarks \@since 2.7.0
 */
export interface RadioWidgetProps<T extends EventTarget = HTMLSpanElement> extends RadioWidgetAttributes<T> {
    /**
     * An id to use for the item that is required for a11y. This should normally
     * be handled and provided automatically by the `RadioGroup` component.
     */
    id:FunctionMaybe< string>

    /**
     * Boolean if the radio is currently checked.
     */
    checked: FunctionMaybe<boolean>

    /**
     * The current tab index for the item that should normally be handled
     * automatically by the `RadioGroup` component. When there are no checked
     * radio items or the item is checked, this should be `0`. Otherwise this
     * should be set to `-1` so that it is shown that it can be focused but isn't
     * included in the tab index flow.
     */
    tabIndex: FunctionMaybe<0 | -1>
}

/**
 * This component offers no styles and probably shouldn't be used externally
 * since it is just rendered by the `RadioGroup` component.
 *
 * @remarks \@since 2.7.0
 */
export const RadioWidget = ({ checked, children, ref, ...props }: RadioWidgetProps<HTMLSpanElement>) => {
    return (
        <span {...props} aria-checked={checked} ref={ref} role="radio">
            {children}
        </span>
    )
}
