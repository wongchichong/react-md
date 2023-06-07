import type { ReactElement } from 'voby';
import { $ } from 'voby';
import { AsyncSwitch, Checkbox, useChecked } from "@react-md/form";
import { useTimeout } from "@react-md/utils";

export default function AsyncSwitchExample(): Child {
  const loading = $(false);
  const checked = $(false);
  const [fail, handleFailChange] = useChecked(false);
  const [start] = useTimeout(() => {
    loading(false);
    if (fail) {
      checked((prevChecked) => !prevChecked);
    }
  }, 5000);

  return (
    <>
      <Checkbox
        id="async-switch-fail"
        label={'Fail the "API" call'}
        checked()={fail}
        onChange={handleFailChange}
      />
      <AsyncSwitch
        id="async-switch"
        name="switch"
        label="Async Switch"
        loading()={loading}
        onChange={(event) => {
          start();
          loading(true);
          checked(event.currentTarget.checked);
        }}
        checked={checked}
      />
    </>
  );
}
