// ;

import type { PortalInto } from "./getContainer"
import { Portal } from "./Portal"
import type { Element } from 'voby'

/**
 * If any of these props are defined on a component, the component will render
 * in a portal instead of the current tree.
 */
export interface RenderConditionalPortalProps {
  /**
   * Boolean if the portal should be used.
   */
  portal?: FunctionMaybe<Nullable<boolean>>

  /**
   * @see {@link PortalProps.into}
   */
  portalInto?: FunctionMaybe<Nullable<PortalInto>>

  /**
   * @see {@link PortalProps.intoId}
   */
  portalIntoId?: FunctionMaybe<Nullable<string>>
}

export interface ConditionalPortalProps extends RenderConditionalPortalProps {
  /**
   * This children to render.
   *
   * @remarks \@since 4.0.0 Allows `Child` instead of `ReactElement | null`
   */
  children: Children
}

/**
 * This is a very simple component that is used in other places within react-md
 * to conditionally render the children within a portal or not based on general
 * portal config props.
 */
export function ConditionalPortal({ portal, portalInto, portalIntoId, children, }: ConditionalPortalProps): Element {
  if (!portal && !portalInto && !portalIntoId) {
    return (<>{children}</>) as any
  }

  //@ts-ignore
  return <Portal into={portalInto} intoId={portalIntoId}>
    {children}
  </Portal>

}
