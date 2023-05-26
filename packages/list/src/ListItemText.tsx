import { bem } from "@react-md/utils"

export interface ListItemTextProps {
    /**
     * An optional `className` to apply to the `<span>` surrounding the `children`.
     */
    className?: Class

    /**
     * An optional `className` to apply to the `<span>` surrounding the
     * `secondaryText` if it was provided.
     */
    secondaryTextClassName?: Class

    /**
     * The main text children to display. This will be stacked above the
     * `secondaryText` if it was provided.
     */
    children?: Children

    /**
     * Optional secondary text to display that will be stacked below the
     * `children`. This also applies some styles to make the text less prominent
     * than the `children`.
     */
    secondaryText?: Child
}

const block = bem("rmd-list-item")

/**
 * This component us used to create the one to three lines of text within a
 * `ListItem` or `SimpleListItem`.
 */
export function ListItemText({
    className,
    secondaryTextClassName,
    secondaryText,
    children,
}: ListItemTextProps): Element {
    let secondaryContent: Child
    if (secondaryText) {
        secondaryContent = (
            <span
                className={[
                    block("text", { secondary: true }),
                    secondaryTextClassName
                ]}
            >
                {secondaryText}
            </span>
        )
    }

    return (
        <span className={[block("text"), className]}>
            {children}
            {secondaryContent}
        </span>
    )
}
