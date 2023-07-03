import type { ReactElement } from "react"
import type { SVGIconProps } from "@react-md/icon"
import { SVGIcon } from "@react-md/icon"

// this one isn't included in material icons for some reason?
export default function LightbulbSVGIcon(props: SVGIconProps): Child {
    return (
        <SVGIcon {...props}>
            <path d="M9,21c0,0.55,0.45,1,1,1h4c0.55,0,1-0.45,1-1v-1H9V21z M12,2C8.14,2,5,5.14,5,9c0,2.38,1.19,4.47,3,5.74V17 c0,0.55,0.45,1,1,1h6c0.55,0,1-0.45,1-1v-2.26c1.811-1.271,3-3.36,3-5.74C19,5.14,15.859,2,12,2z" />
        </SVGIcon>
    )
}
