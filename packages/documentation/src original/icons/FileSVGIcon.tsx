// source: https://ionicons.com/
import type { ReactElement } from "react"
import type { SVGIconProps } from "@react-md/icon"
import { SVGIcon } from "@react-md/icon"

export default function FileSVGIcon(props: SVGIconProps): Child {
    return (
        <SVGIcon {...props} viewBox="0 0 512 512">
            <path d="M288 48H136c-22.092 0-40 17.908-40 40v336c0 22.092 17.908 40 40 40h240c22.092 0 40-17.908 40-40V176L288 48zm-16 144V80l112 112H272z" />
        </SVGIcon>
    )
}
