import type { ReactElement } from "react";
import type { ListboxProps } from "@react-md/form";
import { Select } from "@react-md/form";

interface Color {
  [key: string]: string;
  name: string;
  value: string;
}

export interface ColorPickerProps extends ListboxProps {
  name: string;
  colors: Color[];
}

export default function ColorPicker({
  colors,
  name,
  value,
  onChange,
}: ColorPickerProps): Child {
  return (
    <Select
      id={`color-${name}`}
      options={colors}
      labelKey="name"
      valueKey="value"
      value={value}
      onChange={onChange}
    />
  );
}
