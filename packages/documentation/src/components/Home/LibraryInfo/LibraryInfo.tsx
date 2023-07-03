import type { ReactElement } from 'voby';
import { Table, TableBody } from "@react-md/table";
import { Typography, TextContainer } from "@react-md/typography";

import Header from "./Header";
import ResponsiveBlock from "./ResponsiveBlock";

import AccessibilityCons from "./AccessibilityCons";
import AccessibilityPros from "./AccessibilityPros";
import ComponentsCons from "./ComponentsCons";
import ComponentsPros from "./ComponentsPros";
import DocumentationCons from "./DocumentationCons";
import DocumentationPros from "./DocumentationPros";
import OtherCons from "./OtherCons";
import OtherPros from "./OtherPros";
import StylingCons from "./StylingCons";
import StylingPros from "./StylingPros";

import styles from "./LibraryInfo.module.scss";

export default function LibraryInfo(): ReactElement | null {
  return (
    <>
      <TextContainer>
        <Typography type="headline-6" component="p">
          Before you choosing this library, it is highly recommended to check
          out the pros and cons list below.
        </Typography>
      </TextContainer>
      <Table fullWidth className={styles.container} disableHover>
        <Header />
        <TableBody vAlign="top" lineWrap="padded">
          <ResponsiveBlock
            name="Styling"
            pros={<StylingPros />}
            cons={<StylingCons />}
          />
          <ResponsiveBlock
            name="Components"
            pros={<ComponentsPros />}
            cons={<ComponentsCons />}
          />
          <ResponsiveBlock
            name="Accessibility"
            pros={<AccessibilityPros />}
            cons={<AccessibilityCons />}
          />
          <ResponsiveBlock
            name="Documentation"
            pros={<DocumentationPros />}
            cons={<DocumentationCons />}
          />
          <ResponsiveBlock
            name="Other"
            pros={<OtherPros />}
            cons={<OtherCons />}
          />
        </TableBody>
      </Table>
    </>
  );
}
