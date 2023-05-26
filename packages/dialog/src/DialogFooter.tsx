


import { bem } from "@react-md/utils"

/**
 * An optional alignment for the content within the footer. Since the majority
 * of dialog footers are used to contain action buttons, the default alignment
 * is near the end.
 *
 * @remarks \@since 3.1.0
 */
export type DialogFooterAlignment =
  | "none"
  | "start"
  | "end"
  | "between"
  | "stacked-start"
  | "stacked-end"

export interface DialogFooterProps extends HTMLAttributes<HTMLDivElement> {
  /** {@inheritDoc DialogFooterAlignment} */
  align?: FunctionMaybe<Nullable<DialogFooterAlignment>>
}

const block = bem("rmd-dialog")

export const DialogFooter = ({ children, className, align = "end", ref, ...props }: DialogFooterProps) => {
  return <footer
    {...props}
    //@ts-ignore
    ref={ref}
    className={[
      block("footer", {
        flex: align !== "none",
        "flex-v": align === "stacked-start" || align === "stacked-end",
        start: align === "start" || align === "stacked-start",
        between: align === "between",
        end: align === "end" || align === "stacked-end",
      }),
      className
    ]}
  >
    {children}
  </footer>
}

