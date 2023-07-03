import type { ReactElement } from "react";
import type { BadgeTheme } from "@react-md/badge";
import { BadgedButton } from "@react-md/badge";

import styles from "./SimpleExamples.module.scss";

const themes: BadgeTheme[] = ["primary", "secondary", "default", "clear"];

export default function ThemedBadges(): Child {
  return (
    <>
      {themes.map((theme) => (
        <BadgedButton
          key={theme}
          id={`badged-button-${theme}`}
          badgeTheme={theme}
          className={styles.container}
        >
          {theme.length}
        </BadgedButton>
      ))}
    </>
  );
}
