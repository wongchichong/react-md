import styles from "./Blockquote.module.scss"

export default function Blockquote({
    className,
    children,
    ...props
}: HTMLAttributes<HTMLQuoteElement>): Child {
    return (
        <blockquote {...props} className={[styles.blockquote, className]}>
            {children}
        </blockquote>
    )
}
