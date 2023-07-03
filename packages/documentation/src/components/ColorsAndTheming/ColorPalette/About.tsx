import type { ReactElement } from 'voby';
import { Typography, TextContainer } from "@react-md/typography";
import { Link } from "@react-md/link";

import Code from "components/Code";
import CodeBlock from "components/CodeBlock";
import Heading from "components/Heading";

export default function About(): Child {
  return (
    <TextContainer>
      <Heading id="color-palette" level={2}>
        Color Palette
      </Heading>
      <Typography type="headline-6" component="p">
        I recommend reading{" "}
        <Link href="https://material.io/design/color/the-color-system.html">
          the color system
        </Link>{" "}
        documentation from the main material design website for a better
        understanding of the color system.
      </Typography>
      <Typography>
        Material design provides a default color palette that has 256 colors for
        you to pick and choose from, but you are not required to use this color
        palette within <Code>react-md</Code>. This number might seem
        overwhelming at first, but you will never need all the colors at once
        and will primarily only use 3 to 6 colors. Every color will be exported
        as a Sass variable so you can easily use them within your stylesheets,
        but they will also be included in the <Code>scssVariables</Code> bundle
        at <Code>@react-md/theme/dist/scssVariables</Code> if you&apos;d like to
        access them in javascript.
      </Typography>
      <Typography>
        All the colors will be available below showing their Sass variable name
        as well as the hex value. When accessing the colors in javascript, you
        can extract all the colors with the following snippet:
      </Typography>
      <CodeBlock language="ts">
        {`import scssVariables from "@react-md/theme/dist/scssVariables";

// get all the colors from the color palette
// only the color variables in this package will not be prefixed
// with rmd-theme
const colorKeys = Object.keys(scssVariables).filter(
  name => !/^rmd-theme/.test(name)
);`}
      </CodeBlock>
    </TextContainer>
  );
}
