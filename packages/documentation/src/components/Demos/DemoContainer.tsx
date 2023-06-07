import type { 
 ElementType, 
 HTMLAttributes, 
 ReactElement, 
 ReactNode,  } from 'voby'

import styles from "./DemoContainer.module.scss"

export interface DemoContainerProps extends HTMLAttributes<HTMLDivElement> {
    as?: ElementType
    children: Children
}

export default function DemoContainer({
    as: Component = "div",
    ...props
}: DemoContainerProps): Child {
    return <Component {...props} className={styles.container} />
}
