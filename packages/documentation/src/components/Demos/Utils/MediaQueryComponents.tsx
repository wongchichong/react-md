import type { ReactElement } from 'voby'
import { Divider } from "@react-md/divider"
import { TextContainer, Typography } from "@react-md/typography"
import { 
 MobileOnly, 
 PhoneOnly, 
 TabletOnly, 
 DesktopOnly,  } from "@react-md/utils"

import styles from "./MediaQueryComponents.module.scss"

export default function MediaQueryComponents(): Child {
    return (
        <>
            <TextContainer>
                <MobileOnly>
                    <Typography>
                        This will only appear on phone and tablet screen sizes.
                    </Typography>
                </MobileOnly>
                <PhoneOnly>
                    <Typography>This will only appear on phone screen sizes.</Typography>
                </PhoneOnly>
                <TabletOnly>
                    <Typography>This will only appear on tablet screen sizes.</Typography>
                </TabletOnly>
                <DesktopOnly>
                    <Typography>
                        This will only appear on desktop screen sizes.
                    </Typography>
                </DesktopOnly>
            </TextContainer>
            <Divider />
            <div className={styles.container}>
                <Typography margin="none">
                    This section will gain different styles as the viewport increases. I
                    highly recommend opening the dev tools and seeing how the different
                    styles get applied and when some are completely removed to get a
                    better understanding of the media queries.
                </Typography>
            </div>
        </>
    )
}
