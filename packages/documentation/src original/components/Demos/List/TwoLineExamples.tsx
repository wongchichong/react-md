/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import type { ReactElement } from "react"

import type { AvatarProps } from "@react-md/avatar"
import { Avatar } from "@react-md/avatar"
import { FolderSVGIcon, InfoOutlineSVGIcon } from "@react-md/material-icons"
import { List, ListItem, ListSubheader } from "@react-md/list"
import type { SVGIconProps } from "@react-md/icon"
import { Tooltip, useTooltip } from "@react-md/tooltip"

import Container from "./Container"
import styles from "./TwoLineExamples.module.scss"

const lastAccessedPhotos = new Date(2019, 0, 4)
const lastAccessedRecipes = new Date()
lastAccessedRecipes.setDate(lastAccessedRecipes.getDate() - 2)
const lastAccessedWork = new Date()

const formatShort = (d: Date): string =>
    d.toLocaleString(undefined, {
        month: "short",
        day: "2-digit",
        year: "numeric",
    })

function Folder(props: AvatarProps): Child {
    return (
        <Avatar {...props}>
            <FolderSVGIcon />
        </Avatar>
    )
}

function InfoIcon({
    id,
    className,
    date,
    ...props
}: SVGIconProps & { id: string; date: Date }): Child {
    const { elementProps, tooltipProps } = useTooltip({
        baseId: `${id}-info`,
        defaultPosition: "left",
    })

    return (
        <>
            <span
                {...elementProps}
                tabIndex={0}
                className={cn(styles.icon, className)}
            >
                <InfoOutlineSVGIcon {...props} />
            </span>
            <Tooltip {...tooltipProps}>{date.toLocaleString()}</Tooltip>
        </>
    )
}

export default function TwoLineExamples(): Child {
    return (
        <Container>
            <List>
                <ListSubheader>Folders</ListSubheader>
                <ListItem
                    id="two-line-item-0"
                    secondaryText={formatShort(lastAccessedPhotos)}
                    leftAddon={<Folder color="blue" />}
                    leftAddonType="avatar"
                    rightAddon={
                        <InfoIcon id="two-line-item-0" date={lastAccessedPhotos} />
                    }
                    rightAddonPosition="top"
                >
                    Photos
                </ListItem>
                <ListItem
                    id="two-line-item-1"
                    secondaryText={formatShort(lastAccessedRecipes)}
                    leftAddon={<Folder color="green" />}
                    leftAddonType="avatar"
                    rightAddon={
                        <InfoIcon id="two-line-item-1" date={lastAccessedRecipes} />
                    }
                    rightAddonPosition="top"
                >
                    Recipes
                </ListItem>
                <ListItem
                    id="two-line-item-2"
                    secondaryText={formatShort(lastAccessedWork)}
                    leftAddon={<Folder color="red" />}
                    leftAddonType="avatar"
                    rightAddon={<InfoIcon id="two-line-item-2" date={lastAccessedWork} />}
                    rightAddonPosition="top"
                >
                    Work
                </ListItem>
            </List>
        </Container>
    )
}
