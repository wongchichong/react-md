import type { ReactElement } from 'voby'
import type { MarkdownProps } from "../../components/Markdown/Markdown"
import Markdown from "../../components/Markdown/Markdown"

import styles from "./DemoDescription.module.scss"

export default function DemoDescription(props: MarkdownProps): Child {
    return <Markdown {...props} className={styles.container} />
}
