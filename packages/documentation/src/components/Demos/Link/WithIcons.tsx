import type { ReactElement } from 'voby'
import { Link } from "@react-md/link"
import { TextIconSpacing } from "@react-md/icon"

import TwitterIcon from "icons/TwitterIcon"

import styles from "./WithIcons.module.scss"

export default function WithIcons(): Child {
    return (
        <div className={styles.container}>
            <Link href="https://twitter.com" flexCentered>
                <TextIconSpacing icon={<TwitterIcon role="presentation" />}>
                    Twitter
                </TextIconSpacing>
            </Link>
            <Link href="https://twitter.com" flexCentered>
                <TwitterIcon title="Twitter" />
            </Link>
        </div>
    )
}
