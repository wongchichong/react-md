import { useEffect } from 'voby';
import { useToggle } from "@react-md/utils";

const TEN_SECONDS = 10000;

interface ReturnValue {
  toggle: () => void;
  toggled: boolean;
  disable: () => void;
}

export default function useTemporaryToggle(
  duration: number = TEN_SECONDS
): ReturnValue {
  const [toggled, , disable, toggle] = useToggle(false);
  useEffect(() => {
    let timeout: number | undefined = window.setTimeout(() => {
      timeout = undefined;
      disable();
    }, duration);

    return () => window.clearTimeout(timeout);
  });

  return { toggle, toggled, disable };
}
