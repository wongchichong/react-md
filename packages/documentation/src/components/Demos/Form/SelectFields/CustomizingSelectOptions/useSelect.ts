import { $ } from 'voby';

type ChangeHandler = (nextValue: string) => void;

/**
 * A simple hook that memoizes the value and change handler for the select
 * demos. This is really only needed since the set state action from `useState`
 * throws a warning about a second argument being applied since the `onChange`
 * callback for the `Select` is:
 *
 * ```
 * onChange(nextValue: string, option: ListboxOption): void
 * ```
 *
 * This just makes sure that we only use the nextValue for all the demos.
 *
 * @param defaultValue - The default value for the select in the demo
 * @returns an ordered list of value and change handler.
 */
export default function useSelect(
  defaultValue: string
): [string, ChangeHandler] {
  const value = $(defaultValue);
  const handleChange = ((nextValue: string) => {
    value(nextValue);
  });

  return [value(), handleChange];
}
