import type { ReactElement } from 'voby';

import styles from "./index.module.scss";
import DemoPage from "../DemoPage";

import SimpleUsage from "./SimpleUsage";
import simpleUsage from "./SimpleUsage.md";

import DifferentSizes from "./DifferentSizes";
import differentSizes from "./DifferentSizes.md";

import AutoDense from "./AutoDense";
import autoDense from "./AutoDense.md";

import FixedWithOffset from "./FixedWithOffset";
import fixedWithOffset from "./FixedWithOffset.md";

import AnimatingAppBar from "./AnimatingAppBar";
import animatingAppBar from "./AnimatingAppBar.md";

const demos = [
  {
    name: "Simple Usage",
    description: simpleUsage,
    children: <SimpleUsage />,
    disableCard: true,
  },
  {
    name: "Different Sizes",
    description: differentSizes,
    children: <DifferentSizes />,
  },
  {
    name: "Auto Dense",
    description: autoDense,
    children: <AutoDense />,
  },
  {
    name: "Fixed with Offset",
    description: fixedWithOffset,
    children: <FixedWithOffset />,
  },
  {
    name: "Animating App Bar",
    description: animatingAppBar,
    children: <AnimatingAppBar />,
  },
];

export default function AppBar(): Child {
  return (
    <DemoPage
      demos={demos}
      packageName="app-bar"
      className={styles.container}
      fullPageFAB
      phoneFullPage
      disableFullPageAppBar
      disableFullPageContent
    />
  );
}
