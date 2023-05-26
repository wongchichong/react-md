



/**
 * The overlay positions relative to the `MediaContainer` component.  Most of
 * the sizes are self-explanatory, but the `middle` position will be centered
 * vertically while `center` will be centered `horizontally`.
 */
export type MediaOverlayPosition =
    | "top"
    | "right"
    | "bottom"
    | "left"
    | "middle"
    | "center"
    | "absolute-center"

export interface MediaOverlayProps<T extends EventTarget = HTMLDivElement> extends HTMLAttributes<T> {
    /**
     * The position of the overlay within the `MediaContainer`.
     */
    position?: MediaOverlayPosition
}

/**
 * The `MediaOverlay` component is used to create an overlay over specific media
 * items within the `MediaContainer` component. You will need to apply most of
 * your own styles as this is really just used for positioning.
 */
export const MediaOverlay = ({ className, children, position = "bottom", ref, ...props }: MediaOverlayProps<HTMLDivElement>) => {
    return (
        <div
            {...props}
            ref={ref}
            className={[
                `rmd-media-overlay rmd-media-overlay--${position}`,
                className
            ]}
        >
            {children}
        </div>
    )
}

