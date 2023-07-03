import type { ReactElement } from "react";
import { useState } from "react";
import { AsyncSwitch, Checkbox, useChecked } from "@react-md/form";
import { useTimeout } from "@react-md/utils";

export default function AsyncSwitchExample(): Child {
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [fail, handleFailChange] = useChecked(false);
  const [start] = useTimeout(() => {
    setLoading(false);
    if (fail) {
      setChecked((prevChecked) => !prevChecked);
    }
  }, 5000);

  return (
    <>
      <Checkbox
        id="async-switch-fail"
        label={'Fail the "API" call'}
        checked={fail}
        onChange={handleFailChange}
      />
      <AsyncSwitch
        id="async-switch"
        name="switch"
        label="Async Switch"
        loading={loading}
        onChange={(event) => {
          start();
          setLoading(true);
          setChecked(event.currentTarget.checked);
        }}
        checked={checked}
      />
    </>
  );
}
