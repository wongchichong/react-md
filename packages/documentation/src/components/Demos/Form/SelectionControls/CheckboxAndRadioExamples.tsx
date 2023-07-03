import type { ReactElement } from 'voby';
import { Checkbox, InputToggle, Radio } from "@react-md/form";
import { 
 CheckBoxSVGIcon, 
 RadioButtonCheckedSVGIcon,  } from "@react-md/material-icons";

export default function CheckboxAndRadioExamples(): Child {
  return (
    <>
      <Checkbox
        id="checkbox-1"
        name="checkboxes"
        label="Checkbox 1"
        defaultChecked
      />
      <Checkbox id="checkbox-2" name="checkboxes" label="Checkbox 2" />
      <InputToggle
        id="checkbox-3"
        name="checkboxes"
        type="checkbox"
        icon={<CheckBoxSVGIcon />}
        label="Checkbox 3"
      />
      <Radio id="radio-1" name="radios" label="Radio 1" value="a" />
      <Radio id="radio-2" name="radios" label="Radio 2" value="b" />
      <InputToggle
        id="radio-3"
        type="radio"
        name="radios"
        label="Radio 3"
        icon={<RadioButtonCheckedSVGIcon />}
        value="c"
      />
    </>
  );
}
