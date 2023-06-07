import type { ReactElement } from 'voby'
import type { ButtonThemeProps } from "@react-md/button"
import { buttonThemeClassNames } from "@react-md/button"
import { useInteractionStates } from "@react-md/states"

import type { LinkUnstyledProps } from "./LinkUnstyled"
import LinkUnstyled from "./LinkUnstyled"

export interface LinkButtonProps extends LinkUnstyledProps, ButtonThemeProps {
    target?: FunctionMaybe<Nullable<string>>
    tooltipClassName?: Class
}

export default function LinkButton(
    providedProps: LinkButtonProps
): Child {
    const {
        className: _ClassName,
        theme,
        buttonType,
        themeType,
        children,
        ...props
    } = providedProps

    const { ripples, className, handlers } = useInteractionStates({
        handlers: props,
        className: buttonThemeClassNames(providedProps),
    })

    return (
        <LinkUnstyled
            {...props}
            {...handlers}
            className={buttonThemeClassNames({
                className,
                theme,
                themeType,
                buttonType,
            })}
        >
            {ripples}
            {children}
        </LinkUnstyled>
    )
}
