import type { ReactElement } from 'voby';
import { $ } from 'voby';
import { Button } from "@react-md/button";
import { AlarmSVGIcon, CloseSVGIcon } from "@react-md/material-icons";
import { Sheet } from "@react-md/sheet";

import ActionChip from "./ActionChip";
import styles from "./ActionChipAlarm.module.scss";

export default function ActionChipAlarm(): Child {
  const visible = $(false);
  const hide = (): void => visible(false);

  return (
    <>
      <ActionChip
        id="action-chip-alarm"
        leftIcon={<AlarmSVGIcon />}
        onClick={() => visible(true)}
      >
        Set Alarm
      </ActionChip>
      <Sheet
        id="action-chip-alarm-sheet"
        aria-label="Alarm"
        className={styles.absolute}
        overlayClassName={styles.absolute}
        position="bottom"
        visible={visible}
        onRequestClose={hide}
        portalIntoId="action-chips-card"
        disableScrollLock
      >
        <Button
          id="action-chip-alarm-close"
          aria-label="Close"
          buttonType="icon"
          onClick={hide}
        >
          <CloseSVGIcon />
        </Button>
      </Sheet>
    </>
  );
}
