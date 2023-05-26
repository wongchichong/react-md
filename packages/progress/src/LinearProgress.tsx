import { CSSProperties, mergeStyles, $$ } from 'voby'
import { useMemo } from 'voby'

import { bem, getPercentage } from "@react-md/utils"

import type { ProgressProps } from "./types"

export interface LinearProgressProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "id" | "max" | "min" | "value" | "align">,
    ProgressProps {
    /**
     * An optional style to apply to the progress bar. This will be merged with
     * the current width or height tracking the progress when a `value` is also
     * provided.
     */
    barStyle?: FunctionMaybe<Nullable<string | StyleProperties>>

    /**
     * An optional className to apply to the progress bar.
     */
    barClassName?: Class

    /**
     * Boolean if the progress should be reversed. This will change the progress
     * direction from `left-to-right` to be `right-to-left`. If the current
     * language is a rtl language and this prop is enabled, the direction will
     * still be `left-to-right`.
     */
    reverse?: FunctionMaybe<Nullable<boolean>>

    /**
     * Boolean if the progress should be vertical instead of horizontal.  When
     * this prop is set, you should also set the `verticalHeight` prop to a height
     * value you want for your progress bar.
     */
    vertical?: FunctionMaybe<Nullable<boolean>>

    /**
     * Since there isn't really a good way to have "auto height", you'll need to
     * manually set the progress bar's height with this prop to some pixel value.
     * If you'd prefer to set the height in Sass/css, set this value to `null`
     * instead since this value would be passed down as a `height` inline style.
     */
    verticalHeight?: FunctionMaybe<Nullable<number>> | null
}

const block = bem("rmd-linear-progress")

export const LinearProgress = (
    {
        style: propStyle,
        className,
        barStyle: propBarStyle,
        barClassName,
        min = 0,
        max = 100,
        value,
        reverse = false,
        animate = true,
        vertical = false,
        verticalHeight = 240,
        ref,
        ...props
    }: LinearProgressProps
) => {
    const style = useMemo(() => {
        if (!vertical || verticalHeight === null) {
            return propStyle
        }

        return {
            //@ts-ignore
            ...propStyle,
            height: verticalHeight,
        }
    })

    let progress: number | undefined
    if (typeof value === "number") {
        progress = getPercentage({ min: $$(min), max: $$(max), value })
    }
    const barStyle = useMemo(() => {
        if (typeof progress !== "number") {
            return propBarStyle
        }

        const key = vertical ? "height" : "width"
        return mergeStyles({ [key]: `${progress * 100}%` }, $$(propBarStyle))
    })

    const determinate = typeof progress === "number"
    const indeterminate = !determinate
    //@ts-ignore
    return <span {...props}
        ref={ref as any}
        style={style}
        role="progressbar"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        className={[
            block({
                vertical,
                determinate,
                indeterminate,
            }),
            className
        ]}
    >
        {/* @ts-ignore */}
        <span style={barStyle}
            className={[
                block("bar", {
                    vertical,
                    "vertical-reverse": vertical && reverse,
                    horizontal: !vertical,
                    "horizontal-reverse": !vertical && reverse,
                    animate: animate && determinate,
                    determinate,
                    indeterminate,
                    "determinate-reverse": determinate && reverse && !vertical,
                    "determinate-vertical-reverse":
                        determinate && reverse && vertical,
                    "indeterminate-reverse": indeterminate && reverse && !vertical,
                    "indeterminate-vertical": indeterminate && vertical,
                    "indeterminate-vertical-reverse":
                        indeterminate && reverse && vertical,
                }),
                barClassName
            ]}
        />
    </span>
}

