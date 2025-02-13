import type { ReactElement } from "react"
import type { SVGIconProps } from "@react-md/icon"
import { SVGIcon } from "@react-md/icon"

export default function HtmlIcon(props: SVGIconProps): Child {
    return (
        <SVGIcon {...props} viewBox="0 0 72 96">
            <path
                fill="#d75b26"
                d="M0 2v92c0 1.1.9 2 2 2h68c1.1 0 2-.9 2-2V28H50c-1.1 0-2-.9-2-2V0H2C.9 0 0 .9 0 2z"
            />
            <path fill="#d75b26" d="M71.9 24c-.1-.4-.2-.7-.4-1L52 1.2V24h19.9z" />
            <path
                d="M6 41h60v49H6zm.5-34.6h2.8v5.8H12V6.4h2.8v14.3H12V15H9.2v5.7H6.5V6.4zm12 2.9h-2.7V6.4h8.1v2.9h-2.7v11.4h-2.8V9.3zm6.9-2.9h3.1l1.1 6c.2.9.4 2.4.4 2.4s.2-1.5.4-2.4l1.1-6h3.1l.8 14.3h-2.6l-.3-6.4c-.1-1.1 0-2.4 0-2.4h-.1s-.2 1.5-.4 2.4l-.7 4.1h-2.7l-.7-4.1c-.2-.9-.4-2.4-.4-2.4h-.1s.1 1.3 0 2.4l-.3 6.4h-2.6l.9-14.3zm11.5 0h2.8v11.4h3.7v2.9H37V6.4z"
                fill="#fff"
            />
            <path
                d="M23.5 75c-.5 0-1.1-.2-1.5-.6L13.6 66c-.8-.8-.8-2.1 0-3l8.4-8.4c.8-.8 2.1-.8 3 0 .8.8.8 2.1 0 3l-7 6.9 6.9 6.9c.8.8.8 2.1 0 3-.4.4-.9.6-1.4.6zm25 0c-.5 0-1.1-.2-1.5-.6-.8-.8-.8-2.1 0-3l6.9-6.9-6.9-6.9c-.8-.8-.8-2.1 0-3 .8-.8 2.1-.8 3 0l8.4 8.4c.8.8.8 2.1 0 3L50 74.3c-.4.5-.9.7-1.5.7zm-16.7 4.1c-.2 0-.4 0-.7-.1-1.1-.4-1.7-1.5-1.3-2.6l8.4-25.1c.4-1.1 1.5-1.7 2.6-1.3 1.1.4 1.7 1.5 1.3 2.6l-8.4 25.1c-.2.9-1 1.4-1.9 1.4z"
                fill="#d75b26"
                stroke="#d75b26"
                strokeWidth="1.5"
                strokeMiterlimit="10"
            />
        </SVGIcon>
    )
}
