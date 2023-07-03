import {
    AccessAlarmFontIcon,
    AccessAlarmSVGIcon,
    Rotation3DFontIcon, // the sprite name for this was 3d_rotation.svg
    Rotation3DSVGIcon, // the sprite name for this was 3d_rotation.svg
    TvFontIcon,
    TvSVGIcon,
    HomeFontIcon,
    HomeSVGIcon} from "@react-md/material-icons"
import {Typography} from "@react-md/typography"
import "@react-md/typography/dist/styles.scss"
import { render, useEffect} from "voby"


const materialIcons = () => {
    useEffect(() => {
        const head = document.querySelector("head")

        const links: HTMLLinkElement[] = []
        let href: string
        href = "https://fonts.googleapis.com/css2?family=Material+Icons"
        const link = document.createElement("link")

        link.rel = "stylesheet"
        link.href = href

        head.appendChild(link)
        links.push(link)

        return () => {
            links.forEach((link) => {
                head.removeChild(link)
            })
        }
    }
    )
    return (
        <>
            <div >
                <Typography type="headline-4">Font Icon Versions</Typography>
                <AccessAlarmFontIcon />
                <Rotation3DFontIcon />
                <HomeFontIcon />
                <TvFontIcon />
                <Typography type="headline-4">SVG Icon Versions</Typography>
                <AccessAlarmSVGIcon />
                <Rotation3DSVGIcon />
                <HomeSVGIcon />
                <TvSVGIcon />
            </div>
        </>
    )
}

render(materialIcons, document.body)