import type { Element } from 'voby'


import type { FieldMessageContainerExtension } from "../FormMessageContainer"
import { FormMessageContainer } from "../FormMessageContainer"
import type { TextFieldProps } from "./TextField"
import { TextField } from "./TextField"

/**
 * @remarks \@since 2.5.0
 */
export type TextFieldWithMessageProps =
  FieldMessageContainerExtension<TextFieldProps>

/**
 * This component is a simple wrapper for the `TextField` and `FormMessage`
 * components that should be used along with the `useTextField` hook to
 * conditionally show help and error messages with a `TextField`.
 *
 * Simple example:
 *
 * ```ts
 * const [value, fieldProps] = useTextField({
 *   id: "field-id",
 * });
 *
 * return (
 *   <TextFieldWithMessage
 *     label="Label"
 *     placeholder="Placeholder"
 *     {...fieldProps}
 *   />
 * );
 * ```
 *
 * @remarks \@since 2.5.0
 */
export const TextFieldWithMessage = ({ messageProps, messageContainerProps, ref, ...props }: TextFieldWithMessageProps): Child =>
  <FormMessageContainer       {...messageContainerProps} messageProps={messageProps} >
    <TextField {...props} ref={ref} />
  </FormMessageContainer>
