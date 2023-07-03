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
import LinkButton from "../LinkButton";

import customization from "./customization.svg";
import JumpStartCard from "./JumpStartCard";

export default function GettingStarted(): Child {
  return (
    <JumpStartCard>
      <CardHeader>
        <CardTitle>Customization and Themes</CardTitle>
      </CardHeader>
      <MediaContainer fullWidth>
        <Image src={customization} />
      </MediaContainer>
      <CardContent disableSecondaryColor>
        <Typography>
          Now that you&apos;ve gotten the hang of using components from{" "}
          <Code>react-md</Code>, it&apos;s time to make your app feel unique!
          There&apos;s no point in having every app look exactly the same
          especially when you need to add your company&apos;s branding.
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <LinkButton
          href="/colors-and-theming/color-palette"
          themeType="outline"
        >
          Customize!
        </LinkButton>
      </CardActions>
    </JumpStartCard>
  );
}
