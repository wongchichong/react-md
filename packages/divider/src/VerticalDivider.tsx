import { $$ } from "voby"
import { Divider } from "./Divider"
import { useVerticalDividerHeight } from "./useVerticalDividerHeight"

export interface VerticalDividerProps extends HTMLAttributes<HTMLDivElement> {
    /** {@inheritDoc VerticalDividerHookOptions.maxHeight} */
    maxHeight?: FunctionMaybe<Nullable<number>>
}

/**
 * This component is used to create a vertical divider based on a parent
 * element's height. This is really only needed when the parent element **has no
 * defined height**.  If there is a defined height, this component is not worth
 * much as the height can be computed in css as normal. This really just fixes
 * the issue that the height would be set to `auto` (which computes to 0 most of
 * the time) when it is not set on a parent element.
 */
export const VerticalDivider = ({ style, maxHeight = 1, ref, ...props }: VerticalDividerProps) => {
    const heightProps = useVerticalDividerHeight({ ref, style, maxHeight: $$(maxHeight), })

    //@ts-ignore
    return <Divider {...props} {...heightProps} vertical />
}
