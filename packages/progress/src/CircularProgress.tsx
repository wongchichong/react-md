import { CSSProperties, mergeStyles, $$ } from 'voby'
import { useMemo } from 'voby'

import { bem, getPercentage } from "@react-md/utils"

import type { ProgressProps } from "./types"

export interface CircularProgressProps
    extends Omit<HTMLAttributes<HTMLSpanElement>, "id" | "max" | "min" | "value">,
    ProgressProps {
    /**
     * An optional style to apply to the svg within the circular progress. The
     * values of this style object will be merged with the current determinate
     * style (if it exists).
     */
    svgStyle?: FunctionMaybe<Nullable<string | StyleProperties>>

    /**
     * An optional className to apply to the svg within the circular progress.
     */
    svgClassName?: Class

    /**
     * An optional style to apply to the circle within the circular progress. The
     * values of this style object will be merged with the current determinate
     * style (if it exists).
     */
    circleStyle?: FunctionMaybe<Nullable<string | StyleProperties>>

    /**
     * An optional className to apply to the circle within the circular progress.
     */
    circleClassName?: Class

    /**
     * The radius for the circle. It is generally recommended to have the radius
     * be 1/2 of the viewbox and minus a few more pixels so that there is some
     * surrounding padding. You probably shouldn't really be changing this prop
     * though.
     */
    radius?: FunctionMaybe<Nullable<number>>

    /**
     * The center point for the circle. This should be half of the `viewBox` prop
     * 99% of the time and probably won't be changed.
     */
    center?: FunctionMaybe<Nullable<number>>

    /**
     * The viewbox for the child svg. I wouldn't recommend changing this value as
     * you will also need to update the `dashoffset` in both Sass and this prop to
     * get the animation to look nice again.
     */
    viewBox?: FunctionMaybe<Nullable<string>>

    /**
     * The `stroke-dashoffset` for the circle within the SVG. You probably won't
     * be changing this value that much as it should match the
     * `$rmd-progress-circle-dashoffset` Sass variable. This is really just used
     * to help to create the determinate progress animation.
     */
    dashoffset?: FunctionMaybe<Nullable<number>>

    /**
     * The max rotation value for the circular progress. If you set this value to
     * a number less than or equal to 0, the circular progress will no longer
     * rotate with the determinate progress type.
     */
    maxRotation?: FunctionMaybe<Nullable<number>>

    /**
     * Boolean if the circular progress should be centered using left and right
     * margins.
     */
    centered?: FunctionMaybe<Nullable<boolean>>

    /**
     * Boolean if the smaller size should be used instead.
     *
     * @remarks \@since 2.3.0
     */
    small?: FunctionMaybe<Nullable<boolean>>
}

const block = bem("rmd-circular-progress")

export const CircularProgress = (
    {
        className,
        svgStyle: pss, //propSvgStyle,
        svgClassName,
        circleStyle: pcs, //propCircleStyle,
        circleClassName,
        value,
        min: mn = 0,
        max: mx = 100,
        radius = 30,
        center = 33,
        viewBox = "0 0 66 66",
        dashoffset: dss = 187,
        animate = true,
        centered = true,
        maxRotation: mr = 360 * 1.75,
        small = false,
        ref,
        ...props
    }: CircularProgressProps
) => {
    let progress: number | undefined
    const min = $$(mn), max = $$(mx), propSvgStyle = $$(pss), maxRotation = $$(mr), dashoffset = $$(dss),
        propCircleStyle = $$(pcs)

    if (typeof value === "number") {
        progress = getPercentage({ min, max, value })
    }

    const svgStyle = useMemo(() => {
        if (typeof progress !== "number") {
            return propSvgStyle
        }

        let transform = propSvgStyle && (propSvgStyle as StyleProperties).transform
        if (maxRotation > 0) {
            const rotate = `rotate(${maxRotation * progress}deg)`
            transform = `${rotate}${transform ? ` ${transform}` : ""}`
        }

        return mergeStyles({
            WebkitTransform: transform,
            transform,
        } as CSSProperties, propSvgStyle)
    })

    const circleStyle = useMemo(() => {
        if (typeof progress !== "number") {
            return propCircleStyle
        }

        return mergeStyles({ strokeDashoffset: dashoffset - dashoffset * progress }, propCircleStyle)
    })

    const determinate = typeof progress === "number"
    const indeterminate = !determinate
    return <span
        {...props}
        ref={ref}
        role="progressbar"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        className={[block({ centered, small }), className]}
    >
        <svg
            style={svgStyle as any}
            className={[
                block("svg", {
                    animate: animate && determinate,
                    determinate,
                    indeterminate,
                }),
                svgClassName
            ]}
            viewBox={viewBox}
        >
            <circle
                style={circleStyle as any}
                className={[
                    block("circle", {
                        animate: animate && determinate,
                        determinate,
                        indeterminate,
                    }),
                    circleClassName
                ]}
                r={radius}
                cx={center}
                cy={center}
            />
        </svg>
    </span>
}
