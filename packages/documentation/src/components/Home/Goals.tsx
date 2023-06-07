import type { ReactElement } from 'voby';
import { TextContainer } from "@react-md/typography";

import { Markdown } from "components/Markdown";

import markdown from "./Goals.md";
import styles from "./Goals.module.scss";

export default function Goals(): Child {
  return (
    <TextContainer className={styles.goals}>
      <Markdown>{markdown}</Markdown>
    </TextContainer>
  );
}
