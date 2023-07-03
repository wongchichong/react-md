import type { ReactElement } from 'voby'
import { $ } from 'voby'
import LinkUnstyled from "../../components/LinkUnstyled"
import { useRouter } from "next/router"

export interface HeadingLinkProps {
    idRef: string
}

export default function HeadingLink({ idRef }: HeadingLinkProps): Child {
    const { asPath } = useRouter()
    const handleClick = ((event: React.JSX.TargetedMouseEvent<HTMLAnchorElement>) => {
            const area = document.createElement("textarea")
            area.value = event.currentTarget.href
            document.body.appendChild(area)

            try {
                area.select()
                document.execCommand("copy")
            } catch (e) {
            } finally {
                document.body.removeChild(area)
                event.currentTarget.focus()
            }
        })
    const prefix = asPath.replace(/#.*$/, "")

    return (
        <LinkUnstyled
            id={`${idRef}-link`}
            href={`${prefix}#${idRef}`}
            className="heading__link"
            onClick={handleClick}
            aria-hidden
        >
            #
        </LinkUnstyled>
    )
}
