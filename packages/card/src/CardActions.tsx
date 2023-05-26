


import { bem } from "@react-md/utils"
import { $$ } from "voby"

export interface CardActionsProps<T extends EventTarget = HTMLDivElement> extends HTMLAttributes<T> {
    /**
     * The alignment to use for the card actions. This is really just a simple
     * pass through to the `justify-content` flex property.
     */
    align?: FunctionMaybe<Nullable<"start" | "end" | "center">>
}

const block = bem("rmd-card")

/**
 * This component is generally used to hold the main actions for the `Card`.
 * It's a good place to add additional buttons or expansion toggles.
 */
export const CardActions = ({ className, align = "end", children, ref, ...props }: CardActionsProps<HTMLDivElement>) =>
    <div
        {...props}
        ref={ref}
        className={[
            block("actions", {
                [$$(align)]: align !== "end",
            }),
            className
        ]}
    >
        {children}
    </div>
