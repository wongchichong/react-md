import type { ReactElement } from 'voby';
import { $ } from 'voby';
import { 
 Card, 
 CardContent, 
 CardHeader, 
 CardSubtitle, 
 CardTitle,  } from "@react-md/card";
import { Divider } from "@react-md/divider";
import { MediaContainer } from "@react-md/media";

import ActionChipAlarm from "./ActionChipAlarm";
import ActionChipBlinds from "./ActionChipBlinds";
import ActionChipLights from "./ActionChipLights";
import Blinds from "./Blinds";

import styles from "./ActionChips.module.scss";

const width = 240;
const height = width * 0.75;

export default function ActionChips(): Child {
  const blinds = $(false);
  return (
    <Card id="action-chips-card" className={styles.container}>
      <MediaContainer fullWidth>
        <Blinds visible={blinds} />
        <img src={`https://picsum.photos/id/218/${width}/${height}`} alt="" />
      </MediaContainer>
      <CardHeader>
        <CardTitle noWrap>Welcome Home Person Name!</CardTitle>
        <CardSubtitle noWrap>Monday 12:30 PM, Mostly Sunny</CardSubtitle>
      </CardHeader>
      <Divider />
      <CardContent className={styles.content} disableExtraPadding>
        <ActionChipLights />
        <ActionChipAlarm />
        <ActionChipBlinds
          visible={blinds}
          onClick={() => blinds((prevBlinds) => !prevBlinds)}
        />
      </CardContent>
    </Card>
  );
}
