import type { ReactElement } from 'voby'
import { Link } from "@react-md/link"
import { Typography } from "@react-md/typography"

export default function MaliciousTarget(): Child {
    return (
        <Typography type="body-2">
            This link to{" "}
            <Link href="https://google.com" target="_blank">
                google.com
            </Link>{" "}
            will be updated to prevent malicious scripts from Google, while this link
            to{" "}
            <Link
                href="https://www.w3.org/"
                target="_blank"
                preventMaliciousTarget={false}
            >
                w3.org
            </Link>{" "}
            will not.
        </Typography>
    )
}
