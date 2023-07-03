import Image from "next/image";
import { 
 CardHeader, 
 CardTitle, 
 CardContent, 
 CardActions, 
 } from "@react-md/card";
import { Divider } from "@react-md/divider";
import { MediaContainer } from "@react-md/media";
import { Typography } from "@react-md/typography";

import Code from "../Code";
import CodeBlock from "../CodeBlock";
import LinkButton from "../LinkButton";

import components from "./components.svg";
import JumpStartCard from "./JumpStartCard";

export default function Components(): Child {
  return (
    <JumpStartCard>
      <CardHeader>
        <CardTitle>Components and Styles</CardTitle>
      </CardHeader>
      <MediaContainer fullWidth>
        <Image src={components} />
      </MediaContainer>
      <CardContent disableSecondaryColor>
        <Typography>
          Once you&apos;ve installed <Code>react-md</Code>, it&apos;s time to
          check out all the components that are available and how to use them.
        </Typography>
      </CardContent>
      <CodeBlock language="tsx">
        {`<Button id="example-button" onClick={() => console.log("I was clicked!")}>
  Example Button
</Button>`}
      </CodeBlock>
      <Divider />
      <CardActions>
        <LinkButton href="/packages/alert/demos" themeType="outline">
          See Examples!
        </LinkButton>
      </CardActions>
    </JumpStartCard>
  );
}
