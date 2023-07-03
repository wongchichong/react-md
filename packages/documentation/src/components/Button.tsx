import type { ReactElement, ReactNode } from 'voby'
import type { ButtonProps } from "@react-md/button"
import { Button as RMDButton } from "@react-md/button"
import { Tooltip, useTooltip } from "@react-md/tooltip"

interface Props extends ButtonProps {
    id: string
    tooltip?: ReactNode
}

export default function Button({
    id,
    tooltip,
    children,
    onClick,
    onBlur,
    onFocus,
    onKeyDown,
    onMouseEnter,
    onMouseLeave,
    onTouchStart,
    onContextMenu,
    ...props
}: Props): Child {
    const { elementProps, tooltipProps } = useTooltip({
        baseId: id,
        disabled: !tooltip,
        onClick,
        onBlur,
        onFocus,
        onKeyDown,
        onMouseEnter,
        onMouseLeave,
        onTouchStart,
        onContextMenu,
    })

    return (
        <>
            <RMDButton {...props} {...elementProps}>
                {children}
            </RMDButton>
            <Tooltip {...tooltipProps}>{tooltip}</Tooltip>
        </>
    )
}
