import type { ReactElement } from 'voby';
import type { MetadataType } from "constants/meta/types";
import { toTitle } from "utils/toTitle";

import styles from "./SearchType.module.scss";

export interface SearchTypeProps {
  type: MetadataType;
}

export default function SearchType({ type }: SearchTypeProps): Child {
  return <span className={styles.type}>{toTitle(type)}</span>;
}
