import type { ReactElement, ReactNode } from 'voby'
import { Children, cloneElement, isValidElement, HTMLAttributes } from 'voby'

import styles from "./SlidersContainer.module.scss"

export interface SlidersContainerProps {
    vertical?: FunctionMaybe<Nullable<boolean>>
    children: Children
}

export default function SlidersContainer({
    vertical = false,
    children,
}: SlidersContainerProps): ReactElement | null {
    return (
        <>
            {Children.map(children, (slider) => {
                if (!isValidElement(slider)) {
                    return slider
                }

                if (vertical) {
                    // Note: vertical sliders to not "natively" support labels without
                    // custom styles.
                    return (
                        <span className={styles.vertical}>
                            {cloneElement(slider, {
                                labelProps: { className: styles.label },
                            } as HTMLAttributes<HTMLDivElement>)}
                        </span>
                    )
                }

                return cloneElement(slider, {
                    className: styles.horizontal,
                } as HTMLAttributes<HTMLDivElement>)
            })}
        </>
    )
}
