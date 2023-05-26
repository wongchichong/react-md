import type { ObservableMaybe } from 'voby'


import { bem } from "@react-md/utils"

export type BadgeContainerProps<T extends EventTarget = HTMLSpanElement> = HTMLAttributes<T>

const block = bem("rmd-badge-container")

/**
 * This is a really simple component that will just allow you to position a
 * badge relative to another component.
 */
export const BadgeContainer = (
    { className, children,
        ref, //?: Observable<HTMLSpanElement>
        ...props }: BadgeContainerProps<HTMLSpanElement>,
): Element => {
    return (
        <span {...props} className={[block(), className]} ref={ref}>
            {children}
        </span>
    )
}

