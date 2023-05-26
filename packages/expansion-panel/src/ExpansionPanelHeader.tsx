import { UnstyledButton } from "@react-md/button"
import { IconRotator, useIcon } from "@react-md/icon"
import { bem } from "@react-md/utils"

export interface ExpansionPanelHeaderProps<T extends EventTarget = HTMLButtonElement>
    extends Omit<ButtonHTMLAttributes<T>, 'icon'> {
    /**
     * The id for the header. This is required for a11y.
     */
    id: FunctionMaybe<string>

    /**
     * The icon to use for the expander icon.
     */
    icon?: Child

    /**
     * Boolean if the panel is currently expanded. This is just used to rotate the
     * icon as needed.
     */
    expanded: FunctionMaybe<boolean>

    /**
     * The click handler that should attempt to toggle the expansion state of the
     * panel.
     */
    onClick: MouseEventHandler<T>

    /**
     * The children to display within the header.
     *
     * Reminder: Since this is a `<button>`, only `inline` elements should be
     * rendered within (so use `<span>` instead of `<div>` for children).
     */
    children: Child

    /**
     * Boolean if the icon rotation transition should be disabled.
     */
    disableTransition?: FunctionMaybe<Nullable<boolean>>
}

const block = bem("rmd-expansion-panel")

/**
 * The header for a panel that controls the expansion state. This is really just
 * a simple button that displays the children before an expander icon.
 *
 * Reminder: Since this is a `<button>`, only `inline` elements should be
 * rendered within (so use `<span>` instead of `<div>` for children).
 */
export const ExpansionPanelHeader = (
    {
        icon: propIcon,
        expanded,
        children,
        className,
        disableTransition = false,
        ref,
        ...props
    }: ExpansionPanelHeaderProps<HTMLButtonElement>
) => {
    const icon = useIcon("expander", propIcon)

    return (
        <UnstyledButton
            {...props}
            ref={ref}
            aria-expanded={expanded || undefined}
            className={[block("header"), className]}
        >
            {children}
            {icon && (
                <span className={block("icon")}>
                    <IconRotator animate={!disableTransition} rotated={expanded}>
                        {icon}
                    </IconRotator>
                </span>
            )}
        </UnstyledButton>
    )
}
