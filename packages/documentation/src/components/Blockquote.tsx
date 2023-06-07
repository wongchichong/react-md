import type { HTMLAttributes, ReactElement } from 'voby'


import styles from "./Blockquote.module.scss"

export default function Blockquote({
    className,
    children,
    ...props
}: HTMLAttributes<HTMLQuoteElement>): Child {
    return (
        <blockquote {...props} className={cn(styles.blockquote, className)}>
            {children}
        </blockquote>
    )
}
