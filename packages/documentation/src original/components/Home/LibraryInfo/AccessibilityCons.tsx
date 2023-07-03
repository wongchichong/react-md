import type { ReactElement } from "react";

import Code from "components/Code";

import TableCellList from "./TableCellList";

export default function AccessibilityCons(): ReactElement | null {
  return (
    <TableCellList>
      <li>Unable to fix all color contrast ratio issues automatically.</li>
      <li>
        Most components require a unique <Code>id</Code> prop for accessibility
        concerns.
      </li>
      <li>
        Components might require a string version of the <Code>children</Code>{" "}
        to be keyboard searchable.
      </li>
    </TableCellList>
  );
}
