import type { CSSProperties, ObservableMaybe } from 'voby'

import type { CSSTransitionClassNames } from "@react-md/transition"
import { useFixedPositioning } from "@react-md/transition"
import type {
  CalculateFixedPositionOptions,
  LabelRequiredForA11y,
} from "@react-md/utils"
import { TOP_INNER_RIGHT_ANCHOR } from "@react-md/utils"

import type { BaseDialogProps } from "./Dialog"
import { Dialog } from "./Dialog"

export interface BaseFixedDialogProps
  extends Omit<BaseDialogProps, "type">,
  Pick<CalculateFixedPositionOptions, "anchor"> {
  /**
   * The element the dialog should be fixed to. This can either be:
   * - a query selector string to get an element
   * - an HTMLElement (normally a ref.current)
   * - a function that returns an HTMLElement or null
   * - null
   */
  fixedTo: ObservableMaybe<HTMLElement>

  /**
   * Any additional options to apply to the fixed positioning logic. The
   * `transformOrigin` option will be enabled by default.
   */
  options?: FunctionMaybe<CalculateFixedPositionOptions>

  /**
   * An optional function to call to get the fixed positioning options.
   */
  getOptions?(): CalculateFixedPositionOptions
}

export type FixedDialogProps = LabelRequiredForA11y<BaseFixedDialogProps>

const DEFAULT_CLASSNAMES: CSSTransitionClassNames = {
  appear: "rmd-dialog--fixed-enter",
  appearActive: "rmd-dialog--fixed-enter-active",
  enter: "rmd-dialog--fixed-enter",
  enterActive: "rmd-dialog--fixed-enter-active",
  exit: "rmd-dialog--fixed-exit",
  exitActive: "rmd-dialog--fixed-exit-active",
}

/**
 * The `FixedDialog` is a wrapper for the `Dialog` component that can be used to
 * be fix itself to another element. Another term for this component might be a
 * "Pop out Dialog".
 */
export const FixedDialog = (
  {
    fixedTo,
    style: propStyle,
    anchor = TOP_INNER_RIGHT_ANCHOR,
    options,
    getOptions,
    children,
    className,
    classNames = DEFAULT_CLASSNAMES,
    overlayHidden = true,
    disableScrollLock = true,
    onEnter,
    onEntering,
    onEntered,
    onExited,
    ref: nodeRef,
    ...props
  }: FixedDialogProps //& { style: FunctionMaybe<Nullable<string | StyleProperties>>, children?: Children, className?: Class, ref: ObservableMaybe<HTMLDivElement> },
) => {
  const { onRequestClose } = props

  const { ref, style, callbacks } = useFixedPositioning({
    //@ts-ignore
    nodeRef,
    style: propStyle,
    transformOrigin: true,
    onEnter,
    onEntering,
    onEntered,
    onExited,
    anchor,
    fixedTo,
    onScroll: /* istanbul ignore next */ (_event, { visible }) => {
      if (!visible) {
        onRequestClose()
      }
    },
    ...options,
    getFixedPositionOptions: getOptions,
  })

  //@ts-ignore
  return <Dialog
    {...props}
    {...callbacks}
    //@ts-ignore
    ref={ref}
    type="custom"
    //@ts-ignore
    style={style}
    className={["rmd-dialog--fixed", className]}
    classNames={classNames}
    overlayHidden={overlayHidden}
    disableScrollLock={disableScrollLock}
  >
    {children}
  </Dialog>
}
