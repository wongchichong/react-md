import { $ } from 'voby'

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  /**
   * Boolean if the form should no longer prevent default submit behavior. If
   * you enable this prop you should honestly just use a `<form>` element
   * instead
   */
  disablePreventDefault?: FunctionMaybe<Nullable<boolean>>
}

/**
 * This is probably one of the least useful components available as it doesn't
 * do much styling or logic. All this form component will do is add basic flex
 * behavior and prevent the default form submit behavior.
 */
export const Form = ({ children, disablePreventDefault = false, onSubmit, ref, ...props }: FormProps) => {
  const handleOnSubmit = (event) => {
    if (!disablePreventDefault) {
      event.preventDefault()
    }

    if (onSubmit) {
      onSubmit(event)
    }
  }

  return (
    <form {...props} onSubmit={handleOnSubmit} ref={ref}>
      {children}
    </form>
  )
}
