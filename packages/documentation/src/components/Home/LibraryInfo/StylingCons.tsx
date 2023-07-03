import type { ReactElement } from 'voby';

import Code from "../../Code";
import Link from "../../Link";

import TableCellList from "./TableCellList";

export default function StylingCons(): ReactElement | null {
  return (
    <TableCellList>
      <li>
        Styles provided by SCSS (
        <i>Only a con if you are unfamiliar with SCSS</i>
        ).
      </li>
      <li>
        Requires additional setup for including styles by either building the
        styles yourself or including one of the pre-built themes
      </li>
      <li>
        Initial build time is fairly slow due to fixing color contrast ratios.
        Workaround possible by{" "}
        <Link href="/guides/advanced-installation#pre-compiling-the-base-react-md-styles-for-quicker-builds">
          prebuilding the base styles
        </Link>
        .
      </li>
      <li>
        Reusing styleable variables will be slighty more difficult in CSS-in-JS
        solutions. However, the default variable names and their values are
        available in each package in the <Code>dist/scssVariables.js</Code>{" "}
        export.
      </li>
    </TableCellList>
  );
}
