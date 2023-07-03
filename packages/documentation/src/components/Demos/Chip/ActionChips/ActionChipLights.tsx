import type { ReactElement } from 'voby';
import { useEffect, $ } from 'voby';
import { 
 BrightnessHighSVGIcon, 
 BrightnessLowSVGIcon,  } from "@react-md/material-icons";
import { CircularProgress, getProgressA11y } from "@react-md/progress";

import { randomInt } from "utils/random";

import ActionChip from "./ActionChip";

const id = "action-chip-lights";
const progressId = `${id}-progress`;

export default function ActionChipLights(): Child {
  const enabled = $(false);
  const loading = $(false);

  useEffect(() => {
    if (!loading()) {
      return;
    }

    const timeout = window.setTimeout(() => {
      loading(false);
      enabled((prevEnabled) => !prevEnabled);
    }, randomInt({ min: 3, max: 5 }) * 1000);

    return () => {
      window.clearTimeout(timeout);
    };
  });

  let leftIcon = enabled() ? <BrightnessHighSVGIcon /> : <BrightnessLowSVGIcon />;
  if (loading()) {
    leftIcon = <CircularProgress id={progressId} centered={false} />;
  }

  return (
    <ActionChip
      id={id}
      {...getProgressA11y(progressId, loading)}
      leftIcon={leftIcon}
      selected={enabled}
      onClick={() => {
        if (loading) {
          return;
        }

        loading(!loading);
      }}
      yellow={enabled}
    >
      Turn on lights
    </ActionChip>
  );
}
