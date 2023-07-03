import type { ReactElement, ReactNode } from 'voby'
import { useRouter } from "next/router"

import Link from "components/Link"
import type { ItemReferenceLink } from "@react-md/dev-utils/src/utils/"
import "@react-md/dev-utils/@types/sassdoc"

import getId from "./getId"

export interface ReferenceLinkListProps {
    links: ItemReferenceLink[]
}

export default function ReferenceLinkList({
    links,
}: ReferenceLinkListProps): Child {
    const { pathname } = useRouter()
    return (
        <>
            {links.map((link) => {
                const { name, type, packageName } = link
                const id = getId(name, type, packageName)

                let children: Children
                switch (type) {
                    case "mixin":
                        children = `@mixin ${name}`
                        break
                    case "function":
                        children = `@function ${name}`
                        break
                    default:
                        children = `$${name}`
                }
                const href = `${pathname.replace("[id]", packageName)}#${getId(
                    name,
                    type,
                    packageName
                )}`

                return (
                    <li key={id}>
                        <Link href={href}>{children}</Link>
                    </li>
                )
            })}
        </>
    )
}
