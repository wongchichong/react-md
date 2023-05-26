;
import { $ } from 'voby'
import { useToggle } from "@react-md/utils"

type FocusElement =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLLabelElement
  | HTMLSelectElement
  | HTMLDivElement
//@ts-ignore
type BlurEventHandler = /* Focus */EventHandler<FocusElement>
//@ts-ignore
type FocusEventHandler = /* Focus */EventHandler<FocusElement>

type Options = Pick<HTMLAttributes<FocusElement>, "onBlur" | "onFocus">

/**
 * @internal
 */
export function useFocusState({ onFocus, onBlur, }: Options): [boolean, FocusEventHandler, BlurEventHandler] {
  const [focused, setFocused, setBlurred] = useToggle(false)

  const handleFocus = $<FocusEventHandler>((event) => {
    if (onFocus) {
      //@ts-ignore
      onFocus(event)
    }

    setFocused()
  })

  const handleBlur = $<BlurEventHandler>((event) => {
    if (onBlur) {
      //@ts-ignore
      onBlur(event)
    }

    setBlurred()
  })

  return [focused(), handleFocus, handleBlur]
}
