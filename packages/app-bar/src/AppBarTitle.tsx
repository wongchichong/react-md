import { bem } from "@react-md/utils"
import { $$ } from 'voby'
import type { AppBarColorInherit } from "./useInheritContext"
import { useInheritContext } from "./useInheritContext"

export interface AppBarTitleProps<T extends EventTarget = HTMLHeadingElement>
    extends HTMLAttributes<T>, AppBarColorInherit {
    /**
     * Boolean if the title should be placed at the `$rmd-app-bar-title-keyline`.
     */
    keyline?: FunctionMaybe<Nullable<boolean>>

    /**
     * Boolean if the title should not automatically try to wrap the content and
     * span two lines if it is too big. This will automatically add trailing
     * ellipsis for the text overflow as well.
     */
    noWrap?: FunctionMaybe<Nullable<boolean>>
}

const block = bem("rmd-app-bar")

/**
 * This component is used to create a title for your application. If your app is
 * not using the `AppBarNav` component, you can enable the `keyline` prop to
 * ensure that your title aligns with the keyline of your navigation element.
 */
export const AppBarTitle = (
    {
        noWrap = true,
        keyline = false,
        className,
        children,
        inheritColor,
        ref,
        ...props
    }: AppBarTitleProps<HTMLHeadingElement>
) => {
    return (
        <h6
            {...props}
            ref={ref}
            className={[
                block("title", {
                    "no-wrap": noWrap,
                    keyline,
                    inherit: useInheritContext($$(inheritColor)),
                }),
                className
            ]}
        >
            {children}
        </h6>
    )
}
