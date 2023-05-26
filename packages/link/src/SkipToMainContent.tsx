import { $, $$ } from 'voby'
import '@react-md/react'

import { bem } from "@react-md/utils"

import { Link } from "./Link"

export interface SkipToMainContentProps<T extends EventTarget = HTMLAnchorElement>
    extends AnchorHTMLAttributes<T> {
    /**
     * An id to use for the link.
     */
    id?: FunctionMaybe<Nullable<string>>

    /**
     * The id to use for the `<main>` content that should be focused once this
     * link is clicked.
     */
    mainId: FunctionMaybe<string | number>

    /**
     * The children to display once the link has been keyboard focused.
     */
    children?: Children

    /**
     * Boolean if the skip to main content link should be unstyled so that you can
     * provide your own styles. This is just helpful if you are using this
     * component in a multiple places and don't want to keep overriding the
     * default styles each time.
     *
     * Note: there will still be the "base" link styles, font size, and z-index.
     * The `$rmd-link-skip-styles` and `$rmd-link-skip-active-styles` will not be
     * applied.
     */
    unstyled?: FunctionMaybe<Nullable<boolean>>
}

const block = bem("rmd-link-skip")

/**
 * This component allows you to create a screen-reader only/keyboard focusable
 * only link that allows a user to skip to the main content of the page. This is
 * extremely useful when you have a lot of navigation items that must be tabbed
 * through before the main content can be focused and this component should
 * normally be the first focusable element on your page.
 */
export const SkipToMainContent = (
    {
        id = "skip-to-main-content",
        children = "Skip to main content",
        unstyled = false,
        mainId,
        className,
        onClick,
        ref,
        ...props
    }: SkipToMainContentProps<HTMLAnchorElement>
) => {
    const handleClick = (event: JSX.TargetedMouseEvent<HTMLAnchorElement>) => {
        if (onClick) {
            onClick(event)
        }

        event.preventDefault()
        const main = document.getElementById($$(mainId) as string)
        if (!main) {
            if (process.env.NODE_ENV !== "production") {
                /* eslint-disable no-console */
                const foundMain = document.querySelector("main")
                const foundMainId = foundMain && foundMain.id
                const mid= $$(mainId)
                console.error(
                    `Unable to find a main element to focus with an id of: "${mid}".`
                )
                if (foundMainId) {
                    console.error(
                        `However, a "<main>" element was found with an id: "${foundMainId}". Should this be the "mainId" prop for the "SkipToMainContent" component?`
                    )
                }
            }

            return
        }

        main.focus()
    }

    return (
        <Link
            {...props}
            id={id}
            ref={ref}
            href={`#${mainId}`}
            onClick={handleClick}
            className={[block({ styled: !unstyled }), className]}
        >
            {children}
        </Link>
    )
}
