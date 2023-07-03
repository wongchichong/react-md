import type { ReactElement } from 'voby';
import { 
 Table, 
 TableBody, 
 TableCell, 
 TableContainer, 
 TableHeader, 
 TableRow,  } from "@react-md/table";

import Code from "components/Code";
import { Markdown } from "components/Markdown";
import { M_DASH } from "constants/unicode";
import type { ParameterizedItemParameter } from "@react-md/dev-utils/src/utils/";
import "@react-md/dev-utils/@types/sassdoc";

import styles from "./Parameters.module.scss";

export interface ParametersProps {
  parameters: ParameterizedItemParameter[] | undefined;
}

export default function Parameters({
  parameters,
}: ParametersProps): ReactElement | null {
  if (!parameters) {
    return null;
  }

  return (
    <TableContainer>
      <Table disableHover>
        <caption className={styles.caption}>Parameters</caption>
        <TableHeader>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Default Value</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody vAlign="top">
          {parameters.map(
            ({ name, type, description, default: defaultValue }) => (
              <TableRow key={name}>
                <TableCell>
                  <Code noWrap>${name}</Code>
                </TableCell>
                <TableCell className={styles.description} lineWrap>
                  <Markdown>{description}</Markdown>
                </TableCell>
                <TableCell>
                  <Code>{type}</Code>
                </TableCell>
                <TableCell>
                  {defaultValue ? <Code noWrap>{defaultValue}</Code> : M_DASH}
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
