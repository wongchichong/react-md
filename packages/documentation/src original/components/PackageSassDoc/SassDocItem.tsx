import type { ReactElement } from "react"
import { Typography } from "@react-md/typography"

import Code from "components/Code"
import { Markdown } from "components/Markdown"
import GithubLink from "components/GithubLink"
import Link from "components/Link"
import Heading from "components/Heading"
import { GITHUB_FILE_URL, GITHUB_URL } from "constants/github"
import type {
    FormattedSassDocItem,
    FormattedVariableItem,
    FormattedMixinItem,
    FormattedFunctionItem,
} from "@react-md/dev-utils/src/utils/"
import "@react-md/dev-utils/@types/sassdoc"

import getId from "./getId"
import getType from "./getType"
import VariableCode from "./VariableCode"
import Examples from "./Examples"
import ExpandableCode from "./ExpandableCode"
import Parameters from "./Parameters"
import Returns from "./Returns"
import Links from "./Links"
import Throws from "./Throws"
import ReferenceLinkSection from "./ReferenceLinkSection"

import styles from "./SassDocItem.module.scss"

export default function SassDocItem(props: FormattedSassDocItem): Child {
    const {
        name,
        description,
        code,
        sourceCode,
        value,
        compiled,
        overridable,
        examples,
        parameters,
        source,
        packageName,
        type,
        returns,
        throws,
        usedBy,
        links,
        see,
        since,
        requires,
    } = props as FormattedVariableItem &
    FormattedMixinItem &
    FormattedFunctionItem

    const itemType = getType(type)
    const id = getId(name, itemType, packageName)
    const githubId = `${id}-source`

    return (
        <>
            <Heading id={id} level={3} margin="top">
                {name}
            </Heading>
            {since && (
                <Typography margin="none" type="body-2" color="secondary">
                    Since{" "}
                    <Link href={`${GITHUB_URL}/releases/tag/v${since}`}>v{since}</Link>
                </Typography>
            )}
            <div className={styles.row}>
                <Code>{type}</Code>
                <GithubLink
                    id={githubId}
                    aria-label="Github source"
                    href={`${GITHUB_FILE_URL}/${source}`}
                />
            </div>
            {description && <Markdown>{description}</Markdown>}
            {itemType === "variable" && (
                <VariableCode
                    baseId={id}
                    name={name}
                    value={value}
                    compiled={compiled}
                    overridable={overridable}
                />
            )}
            {itemType !== "variable" && (
                <ExpandableCode code={code} sourceCode={sourceCode} />
            )}
            <Returns returns={returns} />
            <Parameters parameters={parameters} />
            <Throws throws={throws} />
            <Examples baseId={id} examples={examples} />
            <Links links={links} see={see} />
            <ReferenceLinkSection links={usedBy}>Used By</ReferenceLinkSection>
            <ReferenceLinkSection links={requires}>Requires</ReferenceLinkSection>
        </>
    )
}
