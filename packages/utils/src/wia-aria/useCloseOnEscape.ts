// import type { KeyboardEventHandler } from 'voby';
import { $ } from 'voby'

/**
 * This will conditionally close the dialog when the escape key is pressed.
 *
 * @param onRequestClose - The function to call to close the dialog.
 * @param disabled - Boolean if the escape key functionality should be disabled
 * @param onKeyDown - An optional keydown event handler to also call.
 * @returns A keydown event handler
 */
export function useCloseOnEscape<E extends HTMLElement>(
  onRequestClose: () => void,
  disabled: boolean,
  onKeyDown?: KeyboardEventHandler<E>
): JSX.KeyboardEventHandler<E> | undefined {
  const handleKeyDown = $<JSX.KeyboardEventHandler<E>>((event) => {
    if (onKeyDown) {
      //@ts-ignore
      onKeyDown(event)
    }

    if (event.key === "Escape") {
      onRequestClose()
    }
  })

  return disabled ? onKeyDown : handleKeyDown
}
