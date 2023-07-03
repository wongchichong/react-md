import type { ReactElement, ReactNode } from 'voby'
import type { LinkProps as NextLinkProps } from "next/link"
import NextLink from "next/link"
import { Link as RMDLink } from "@react-md/link"

export interface LinkProps extends Omit<NextLinkProps, "as" | "children"> {
    id?: FunctionMaybe<Nullable<string>>
    className?: Class
    children: Children
    href: string
}

export default function Link({
    children,
    shallow,
    scroll,
    replace,
    href,
    passHref,
    ...props
}: LinkProps): Child {
    if (href.startsWith("http")) {
        return (
            <RMDLink {...props} href={href}>
                {children}
            </RMDLink>
        )
    }

    return (
        <NextLink
            shallow={shallow}
            scroll={scroll}
            replace={replace}
            href={href}
            passHref={passHref}
        >
            <RMDLink {...props}>{children}</RMDLink>
        </NextLink>
    )
}

Link.defaultProps = {
    passHref: true,
}
