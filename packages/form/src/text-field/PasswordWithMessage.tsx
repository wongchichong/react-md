import type { Element } from 'voby'


import type { FieldMessageContainerExtension } from "../FormMessageContainer"
import { FormMessageContainer } from "../FormMessageContainer"
import type { PasswordProps } from "./Password"
import { Password } from "./Password"

/**
 * @remarks \@since 2.5.0
 */
export type PasswordWithMessageProps =
  FieldMessageContainerExtension<PasswordProps>

/**
 * This component is a simple wrapper for the `Password` and `FormMessage`
 * components that should be used along with the `useTextField` hook to
 * conditionally show help and error messages with a `Password`.
 *
 * Simple example:
 *
 * ```ts
 * const [value, fieldProps] = useTextField({
 *   id: "field-id",
 *   required: true,
 *   minLength: 10,
 * });
 *
 * return (
 *   <PasswordWithMessage
 *     label="Label"
 *     placeholder="Placeholder"
 *     {...fieldProps}
 *   />
 * );
 * ```
 *
 * Note: Unlike the `TextFieldWithMessage` and `TextAreaWithMessage`, the error
 * icon will do nothing for this component unless the `disableVisibility` prop
 * is enabled.
 *
 * @remarks \@since 2.5.0
 */
export const PasswordWithMessage = ({ messageProps, messageContainerProps, ref, ...props }: PasswordWithMessageProps): Child => {
  return (
    <FormMessageContainer
      {...messageContainerProps}
      messageProps={messageProps}
    >
      <Password {...props} ref={ref} />
    </FormMessageContainer>
  )
}
