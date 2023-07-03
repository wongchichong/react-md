import { TextContainer } from "@react-md/typography";

import { Markdown } from "../Markdown";

import markdown from "./Goals.md";
import styles from "./Goals.module.scss";

export default function Goals(): Child {
  return (
    <TextContainer className={styles.goals}>
      <div>testmark inside container</div>
      <Markdown>{markdown}</Markdown>
    </TextContainer>
  );
}
