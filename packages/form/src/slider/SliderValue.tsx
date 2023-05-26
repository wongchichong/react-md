import { $$, Element } from 'voby'

import type { CSSTransitionClassNames } from "@react-md/transition"
import type { TooltipProps } from "@react-md/tooltip"
import { Tooltip } from "@react-md/tooltip"
import { bem } from "@react-md/utils"

import type { ThumbIndex } from "./types"

const styles = bem("rmd-slider-value")

const HORIZONTAL_CLASS_NAMES: CSSTransitionClassNames = {
  enter: "rmd-slider-value--h-off",
  enterActive: "rmd-slider-value--h-on rmd-slider-value--animate",
  exit: "rmd-slider-value--animate",
  exitActive: "rmd-slider-value--h-off",
}

const VERTICAL_CLASS_NAMES: CSSTransitionClassNames = {
  enter: "rmd-slider-value--v-off",
  enterActive: "rmd-slider-value--v-on rmd-slider-value--animate",
  exit: "rmd-slider-value--animate",
  exitActive: "rmd-slider-value--v-off",
}

/**
 * @remarks \@since 2.5.0
 * @internal
 */
export interface SliderValueProps extends TooltipProps {
  index: FunctionMaybe<ThumbIndex>
  animate: FunctionMaybe<boolean>
  discrete: FunctionMaybe<boolean>
  vertical: FunctionMaybe<boolean>
}

/**
 * This component creates the "discrete" slider thumb value by rendering a
 * tooltip when needed.
 *
 * @remarks \@since 2.5.0
 * @internal
 */
export function SliderValue({
  index: id,
  animate,
  discrete,
  vertical,
  children,
  className,
  portal = false,
  ...props
}: SliderValueProps /* &{children?:Children, className?:Class, portal?:boolean} */): Child | null {
  const index = $$(id)
  if (!discrete) {
    return null
  }

  return (
    <Tooltip
      {...props}
      portal={portal}
      className={[
        styles({
          h: !vertical,
          v: vertical,
        }),
        {
          "rmd-slider-thumb--animate": animate,
          [`rmd-slider-thumb--h${index + 1}`]: !vertical,
          [`rmd-slider-thumb--v${index + 1}`]: vertical,
        },
        className
      ]}
      classNames={vertical ? VERTICAL_CLASS_NAMES : HORIZONTAL_CLASS_NAMES}
      position={vertical ? "left" : "above"}
      dense
    >
      {children}
    </Tooltip>
  )
}
