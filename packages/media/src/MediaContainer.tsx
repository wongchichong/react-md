


import { bem } from "@react-md/utils"

export interface MediaContainerProps<T extends EventTarget = HTMLDivElement> extends HTMLAttributes<T> {
    /**
     * An optional aspect ratio height to enforce. This **must** be used alongside
     * the `width` prop.
     */
    height?: FunctionMaybe<Nullable<number>>

    /**
     * An optional aspect ratio width to enforce. This **must** be used alongside
     * the `height` prop.
     */
    width?: FunctionMaybe<Nullable<number>>

    /**
     * Boolean if any media element children should be updated to be responsive.
     */
    auto?: FunctionMaybe<Nullable<boolean>>

    /**
     * Boolean if the media container should have a `width: 100%;` applied.
     */
    fullWidth?: FunctionMaybe<Nullable<boolean>>
}

export interface MediaContainerWithAspectRatioProps
    extends MediaContainerProps {
    height: number
    width: number
}

const block = bem("rmd-media-container")

/**
 * The `MediaContainer` component is used to make responsive images and videos
 * within your app. This component also allows for forcing a specific aspect
 * ratio for these elements with both the `height` and `width` props are
 * provided.
 */
export const MediaContainer = (
    {
        className,
        height,
        width,
        children,
        auto = true,
        fullWidth = false,
        ref,
        ...props
    }: MediaContainerProps<HTMLDivElement> | MediaContainerWithAspectRatioProps
) => {
    const aspectRatio =
        height && width ? `rmd-media-container--${width}-${height}` : ""

    return (
        <div
            {...props}
            ref={ref}
            className={[
                block({
                    auto,
                    "aspect-ratio": aspectRatio,
                    "full-width": fullWidth,
                }),
                aspectRatio,
                className
            ]}
        >
            {children}
        </div>
    )
}