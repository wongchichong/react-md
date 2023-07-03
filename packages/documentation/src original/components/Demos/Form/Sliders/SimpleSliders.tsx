import type { ReactElement } from "react";
import { Slider, useSlider } from "@react-md/form";
import { VolumeOffSVGIcon, VolumeUpSVGIcon } from "@react-md/material-icons";

import { useId } from "components/IdProvider";

import SlidersContainer from "./SlidersContainer";

export default function SimpleSliders(): ReactElement | null {
  const [_value1, controls1] = useSlider();
  const [_value2, controls2] = useSlider(20);
  const [_value3, controls3] = useSlider(0, {
    min: 0,
    max: 10,
    step: 0.5,
  });
  const [_value4, controls4] = useSlider();
  const [_value5, controls5] = useSlider(8, { min: 0, max: 10 });
  const [_disabled, disabledControls] = useSlider(20);
  return (
    <>
      <SlidersContainer>
        <Slider baseId={useId()} label="Horizontal" {...controls1} />
        <Slider baseId={useId()} label="Horizontal" {...controls2} />
        <Slider
          baseId={useId()}
          label="Disabled"
          {...disabledControls}
          disabled
        />
        <Slider
          baseId={useId()}
          label="Volume"
          {...controls3}
          beforeAddon={<VolumeOffSVGIcon />}
          afterAddon={<VolumeUpSVGIcon />}
        />
      </SlidersContainer>
      <SlidersContainer vertical>
        <Slider
          baseId={useId()}
          label="Vertical Slider"
          {...controls4}
          vertical
        />
        <Slider
          baseId={useId()}
          label="Vertical Slider"
          {...controls5}
          vertical
        />
        <Slider
          baseId={useId()}
          label="Disabled Vertical Slider"
          {...disabledControls}
          disabled
          vertical
        />
      </SlidersContainer>
    </>
  );
}
