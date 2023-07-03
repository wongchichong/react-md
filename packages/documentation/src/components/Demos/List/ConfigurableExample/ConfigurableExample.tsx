import type { ReactElement, ReactNode } from 'voby';
import { $ } from 'voby';
import { Avatar } from "@react-md/avatar";
import type { ListItemAddonPosition } from "@react-md/list";
import { List, ListItem } from "@react-md/list";
import { InfoSVGIcon, StyleSVGIcon } from "@react-md/material-icons";

import type { AddonType } from "./ConfigurationForm";
import ConfigurationForm from "./ConfigurationForm";

const LEFT_LOOKUPS: Record<AddonType, ReactNode> = {
  none: null,
  icon: <StyleSVGIcon />,
  avatar: <Avatar src="https://picsum.photos/40/40?image=123" />,
  media: <img src="https://picsum.photos/56?image=700" alt="" />,
  "large-media": <img src="https://picsum.photos/100/56?image=800" alt="" />,
};

const RIGHT_LOOKUPS: Record<AddonType, ReactNode> = {
  none: null,
  icon: <InfoSVGIcon />,
  avatar: <Avatar>A</Avatar>,
  media: <img src="https://picsum.photos/56?image=901" alt="" />,
  "large-media": <img src="https://picsum.photos/100/56?image=203" alt="" />,
};

export default function ConfigurableExample(): ReactElement | null {
  const disabled = $(false);
  const disabledOpacity = $(false);
  const leftAddon = $<AddonType>("none");
  const leftAddonPosition = $<ListItemAddonPosition>("middle");
  const rightAddonPosition = $<ListItemAddonPosition>("middle");
  const rightAddon = $<AddonType>("none");
  const primaryText = $("Hello, world!");
  const secondaryText = $("");
  const threeLines = $(false);

  return (
    <>
      <List>
        <ListItem
          disabled={disabled}
          disabledOpacity={disabledOpacity}
          leftAddon={LEFT_LOOKUPS[leftAddon]}
          leftAddonType={leftAddon === "none" ? undefined : leftAddon}
          leftAddonPosition={leftAddonPosition}
          rightAddon={RIGHT_LOOKUPS[rightAddon]}
          rightAddonType={rightAddon === "none" ? undefined : rightAddon}
          rightAddonPosition={rightAddonPosition}
          primaryText={primaryText}
          secondaryText={secondaryText}
          threeLines={threeLines}
        />
      </List>
      <ConfigurationForm
        disabled()={disabled}
        setDisabled={setDisabled}
        disabledOpacity={disabledOpacity}
        setDisabledOpacity={setDisabledOpacity}
        primaryText={primaryText}
        setPrimaryText={setPrimaryText}
        secondaryText={secondaryText}
        setSecondaryText={setSecondaryText}
        threeLines={threeLines}
        setThreeLines={setThreeLines}
        leftAddon={leftAddon}
        setLeftAddon={setLeftAddon}
        leftAddonPosition={leftAddonPosition}
        setLeftAddonPosition={setLeftAddonPosition}
        rightAddon={rightAddon}
        setRightAddon={setRightAddon}
        rightAddonPosition={rightAddonPosition}
        setRightAddonPosition={setRightAddonPosition}
      />
    </>
  );
}
