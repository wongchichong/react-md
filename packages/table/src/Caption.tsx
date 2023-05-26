
export type CaptionProps<T extends EventTarget = HTMLTableCaptionElement> = HTMLAttributes<T>

/**
 * This component is really just a simple wrapper for applying the `<caption>`
 * typography styles and probably doesn't have much real use if you don't use
 * captions.
 */
export const Caption = ({ className, children, ref, ...props }: CaptionProps<HTMLElement>) =>
    <caption {...props} ref={ref} className={["rmd-caption", className]}>
        {children}
    </caption>
