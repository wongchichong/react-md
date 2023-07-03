import type { ReactElement } from "react"

import { TextIconSpacing } from "@react-md/icon"
import { HomeSVGIcon } from "@react-md/material-icons"
import { MediaContainer } from "@react-md/media"
import { Typography, TextContainer } from "@react-md/typography"

import LinkButton from "components/LinkButton"

import NotFoundSVG from "./NotFoundSVG"
import styles from "./NotFoundPage.module.scss"

interface Props {
    className?: Class
}

export default function NotFoundPage({ className }: Props): Child {
    return (
        <MediaContainer
            className={cn(styles.container, className)}
            height={9}
            width={16}
        >
            <NotFoundSVG />
            <Typography type="headline-2" className={styles.uhh}>
                Uhhh...
            </Typography>
            <TextContainer className={styles.message}>
                <Typography type="headline-6">
                    Looks like this page can&apos;t be found. You can try using the
                    navigation tree to find a specific page or return the home page with
                    the link below.
                </Typography>
            </TextContainer>
            <LinkButton
                id="go-home-link"
                href="/"
                className={styles.link}
                theme="secondary"
                themeType="contained"
            >
                <TextIconSpacing icon={<HomeSVGIcon />}>Home</TextIconSpacing>
            </LinkButton>
        </MediaContainer>
    )
}
