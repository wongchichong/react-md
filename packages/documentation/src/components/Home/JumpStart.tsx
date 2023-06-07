import type { ReactElement } from 'voby';

import GettingStarted from "./GettingStarted";
import Components from "./Components";
import Customization from "./Customization";

import styles from "./JumpStart.module.scss";

export default function JumpStart(): Child {
  return (
    <div className={styles.container}>
      <GettingStarted />
      <Components />
      <Customization />
    </div>
  );
}
