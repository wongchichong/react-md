import type { ReactElement } from "react";
import { Avatar } from "@react-md/avatar";
import scssVariables from "@react-md/avatar/dist/scssVariables";
import { List, ListItem } from "@react-md/list";

import people from "constants/people";

import Container from "./Container";
import styles from "./ColorExamples.module.scss";

const COLORS = Object.keys(scssVariables["rmd-avatar-colors"]);
const transformedPeople = people.map((name, i) => ({
  id: name.toLowerCase().replace(/ /g, "-"),
  name,
  avatar: name.substring(0, 1),
  color: COLORS[i % COLORS.length],
}));

export default function ColorExamples(): Child {
  return (
    <>
      <Container>
        {COLORS.map((color) => (
          <Avatar color={color} key={color}>
            {color.substring(0, 1).toUpperCase()}
          </Avatar>
        ))}
      </Container>
      <List className={styles.list}>
        {transformedPeople.map(({ id, name, avatar, color }, i) => (
          <ListItem
            id={`person-${i}`}
            key={id}
            leftAddon={<Avatar color={color}>{avatar}</Avatar>}
            leftAddonType="avatar"
          >
            {name}
          </ListItem>
        ))}
      </List>
    </>
  );
}
