import type { Observable } from 'voby'
import { $ } from 'voby'

type InputElement = HTMLInputElement | HTMLSelectElement
//@ts-ignore
type ChangeEventHandler<E extends InputElement> = ChangeEventHandler<E>
type DefaultValue =
  | string
  | number
  | readonly string[]
  | (() => string | number | readonly string[])
// type SetValue<T extends DefaultValue> = Dispatch<SetStateAction<T>>

/**
 * This hook can be used to control the state of a radio group or a select
 * element.
 *
 * @param defaultValue - The default value. If you want the user to specifically
 * choose a value, set this to the empty string.
 * @param onChange - An optional change event handler to also call when the
 * change event is triggered.
 * @returns a list containing the current value, a change event handler, and
 * then a manual value setter.
 */
export function useChoice<
  T extends DefaultValue = DefaultValue,
  E extends InputElement = InputElement
>(
  defaultValue: T,
  //@ts-ignore
  onChange?: ChangeEventHandler<E>
): readonly [Observable<T>,
  //@ts-ignore
  ChangeEventHandler<E>/* , SetValue<T> */] {
  const value = $<T>(defaultValue)
  //@ts-ignore
  const handleChange = $<ChangeEventHandler<E>>((event) => {
    if (onChange) {
      onChange(event)
    }

    value(event.currentTarget.value() as T)
  })

  return [value, handleChange/* , setValue */]
}
