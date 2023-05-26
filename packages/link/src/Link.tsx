import { bem } from "@react-md/utils"

export interface LinkProps<T extends EventTarget = HTMLAnchorElement> extends Omit<AnchorHTMLAttributes<T>, 'target'> {
    /**
     * An optional component to render as. This should really only be used if you
     * are using a router library like
     * {@link https://github.com/ReactTraining/react-router|react-router} or
     * {@link https://github.com/reach/router|@reach/router}. This will call
     * `createElement` with this value and provide all props and class name.
     */
    component?: Component

    /**
     * An optional href to apply to the link. If this value is set to the empty
     * string and the `component` prop is not provided, the link will basically be
     * disabled.
     */
    href?: FunctionMaybe<Nullable<string>>

    /**
     * An optional target for the link to be opened in. It is recommended to keep
     * this undefined in most cases. If this is not `_blank`, `_parent`, `_self`,
     * or `_top`, it should be the frame name that the link should be rendered in
     * if using frames.
     */
    target?: FunctionMaybe<"_blank" | "_parent" | "_self" | "_top" | string>

    /**
     * An optional `rel` to apply to the link. This should be a combination of 1
     * to many of:
     * - "alternate"
     * - "author"
     * - "bookmark"
     * - "external"
     * - "help"
     * - "license"
     * - "next"
     * - "nofollow"
     * - "noreferrer"
     * - "noopener"
     * - "prev"
     * - "search"
     * - "tag"
     *
     * This is really just used to override the default behavior of the
     * `preventMaliciousTarget` prop.
     */
    rel?: FunctionMaybe<Nullable<string>>

    /**
     * Boolean if the link should automatically be updated to apply
     * `rel=noopener noreferrer` when the `target` prop is set to `"_blank"`. This
     * is recommended to have enabled by default, but can be disabled by setting
     * this prop to `false` or specifying a `rel` prop yourself. You can read
     * more about the reason for this
     * {@link https://mathiasbynens.github.io/rel-noopener/|here}.
     */
    preventMaliciousTarget?: FunctionMaybe<Nullable<boolean>>

    /**
     * Boolean if the Link should be positioned with a flexbox and align the items
     * centered. This is disabled by default but can be useful when rendering
     * icons within the link.
     */
    flexCentered?: FunctionMaybe<Nullable<boolean>>
}

export interface LinkWithComponentProps extends Omit<LinkProps, 'component'> {
    /**
     * I'm not really sure of a good way to implement this, but when the
     * `component` prop is provided, all valid props from that component should
     * also be allowed.
     */
    [key: string]: any // eslint-disable-line @typescript-eslint/no-explicit-any
    component: Child
}

const block = bem("rmd-link")

/**
 * The `Link` component is used to render links within your app with a basic
 * styles applied and some additional "security" built-in if using the
 * `rel="_blank"`. This can be used with a browser routing library like
 * `react-router` or `reach-router` by providing the `Link` as the
 * `linkComponent` prop.
 */
export const Link = (
    {
        className: propClassName,
        component: Component = "a",
        href: propHref,
        children,
        rel: propRel,
        flexCentered = false,
        preventMaliciousTarget = true,
        ref,
        ...props
    }: LinkProps<HTMLAnchorElement> | LinkWithComponentProps //< | ElementType>
) => {
    const { target } = props
    const href = propHref === "" ? undefined : propHref
    const className = [block({ "flex-centered": flexCentered }), propClassName]

    let rel = propRel
    if (
        preventMaliciousTarget &&
        typeof rel !== "string" &&
        target === "_blank"
    ) {
        rel = "noopener noreferrer"
    }

    //@ts-ignore
    return <Component {...props} className={className} ref={ref} rel={rel} href={href}>
        {children}
    </Component>
}
