import type { ReactElement } from 'voby';
import { Dialog, DialogContent, DialogHeader } from "@react-md/dialog";
import { Typography } from "@react-md/typography";
import { useAppSize } from "@react-md/utils";

//@ts-ignore
import tocs from "../../constants/meta/tocs";

import List from "./List";
import Toggle from "./Toggle";
import { useTOCActions, useTOCVisibility } from "./VisibilityContext";

import styles from "./TableOfContents.module.scss";

export interface TableOfContentsProps {
  pathname: string;
}

const CLASSNAMES = {
  enter: styles.enter,
  enterActive: styles.entering,
  exit: styles.exit,
  exitActive: styles.exiting,
};

export default function TableOfContents({
  pathname,
}: TableOfContentsProps): ReactElement | null {
  const { isPhone, isLargeDesktop } = useAppSize();
  const { visible, rendered } = useTOCVisibility();
  const { hide, toggle } = useTOCActions();

  const anchors = tocs[pathname];
  if (!rendered || !anchors) {
    return null;
  }

  return (
    <>
      {(!isPhone || visible) && (
        <Toggle
          onClick={toggle}
          isLargeDesktop={isLargeDesktop}
          isDialogVisible={visible}
        />
      )}
      <Dialog
        id="table-of-contents"
        aria-labelledby="table-of-contents-title"
        type="custom"
        portal={false}
        overlay={isPhone}
        visible={visible}
        onRequestClose={hide}
        className={styles.dialog}
        overlayClassName={styles.overlay}
        classNames={CLASSNAMES}
        disableScrollLock={!isPhone}
        disableFocusOnMount
        disableFocusContainer
      >
        <DialogHeader className={styles.header}>
          <Typography
            id="table-of-contents-title"
            type="headline-6"
            margin="none"
          >
            Table of Contents
          </Typography>
        </DialogHeader>
        <DialogContent className={styles.content}>
          <List
            anchors={anchors}
            isLargeDesktop={isLargeDesktop}
            onRequestClose={hide}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
