import type { ReactElement } from "react";

import DemoPage from "../DemoPage";

import SimpleChips from "./SimpleChips";
import simpleChips from "./SimpleChips.md";

import FilterChips from "./FilterChips";
import filterChips from "./FilterChips.md";

import ChoiceChips from "./ChoiceChips";
import choiceChips from "./ChoiceChips.md";

import { ActionChips, actionChips } from "./ActionChips";
import { InputChips, inputChips } from "./InputChips";

import NoninteractableChips from "./NoninteractableChips";
import noninteractableChips from "./NoninteractableChips.md";

const demos = [
  {
    name: "Simple Chips",
    description: simpleChips,
    children: <SimpleChips />,
  },
  {
    name: "Filter Chips",
    description: filterChips,
    children: <FilterChips />,
  },
  {
    name: "Action Chips",
    description: actionChips,
    children: <ActionChips />,
    disableCard: true,
  },
  {
    name: "Choice Chips",
    description: choiceChips,
    children: <ChoiceChips />,
    disableCard: true,
  },
  {
    name: "Input Chips",
    description: inputChips,
    children: <InputChips />,
  },
  {
    name: "Noninteractable Chips",
    description: noninteractableChips,
    children: <NoninteractableChips />,
  },
];

export default function Chip(): Child {
  return (
    <DemoPage demos={demos} packageName="chip" fonts={["Material Icons"]} />
  );
}
