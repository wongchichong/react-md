import type { ReactElement } from 'voby';
import { TableHeader, TableRow, TableCell } from "@react-md/table";
import { useAppSize } from "@react-md/utils";

import styles from "./LibraryInfo.module.scss";

export default function Header(): ReactElement | null {
  const { isPhone } = useAppSize();
  if (isPhone) {
    return null;
  }

  return (
    <TableHeader sticky className={styles.header}>
      <TableRow>
        <TableCell header={false} sticky="header" />
        <TableCell>Pros</TableCell>
        <TableCell>Cons</TableCell>
      </TableRow>
    </TableHeader>
  );
}
