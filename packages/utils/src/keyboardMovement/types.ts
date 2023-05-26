import { ObservableMaybe } from "voby"
//import type { NonNullRef } from "../types";

/**
 * @remarks \@since 5.0.0
 */
export interface KeyboardMovementConfiguration {
  /**
   * A list of keys that will attempt to increment the focus index by 1.
   *
   * @defaultValue `["ArrowDown"]`
   */
  incrementKeys?: FunctionMaybe<Nullable<readonly string[]>>

  /**
   * A list of keys that will attempt to decrement the focus index by 1.
   *
   * @defaultValue `["ArrowUp"]`
   */
  decrementKeys?: FunctionMaybe<Nullable<readonly string[]>>

  /**
   * A list of keys that will set the focus index to `0`.
   *
   * @defaultValue `["Home"]`
   */
  jumpToFirstKeys?: FunctionMaybe<Nullable<readonly string[]>>

  /**
   * A list of keys that will set the focus index to the last focusable index.
   *
   * @defaultValue `["End"]`
   */
  jumpToLastKeys?: FunctionMaybe<Nullable<readonly string[]>>
}

/**
 * The defined {@link KeyboardMovementConfiguration} that should be used for
 * custom keyboard focus behavior.
 *
 * @remarks \@since 5.0.0
 */
export type KeyboardMovementConfig = Required<KeyboardMovementConfiguration>

/**
 * @remarks \@since 5.0.0
 */
export interface KeyboardMovementBehavior {
  /**
   * Boolean if pressing a letter will focus the next item in the
   * {@link KeyboardMovementProvider} that starts with the same letter.
   *
   * @defaultValue `false`
   */
  searchable?: FunctionMaybe<Nullable<boolean>>

  /**
   * Boolean if the {@link KeyboardMovementProvider} should allow the focus behavior
   * to loop from the first to last or last to first item instead of preventing
   * any new focus behavior. In other words... if the last item is focused and
   * the user presses a key that should advance the focus to the next focusable
   * element, should the focus stay on the current element or loop back and
   * focus the first focusable item.
   *
   * @defaultValue `false`
   */
  loopable?: FunctionMaybe<Nullable<boolean>>

  /**
   * Boolean if elements that are `aria-disabled` or `disabled` should still be
   * able to gain focus.
   *
   * @defaultValue `false`
   */
  includeDisabled?: FunctionMaybe<Nullable<boolean>>

  /**
   * Boolean if the keyboard movement is horizontal instead of vertical. This
   * updates the default keyboard config to use `ArrowRight` and `ArrowLeft`
   * instead of `ArrowDown` and `ArrowUp`,
   *
   * @remarks \@since 5.1.2
   * @defaultValue `false`
   */
  horizontal?: FunctionMaybe<Nullable<boolean>>
}

/**
 * @remarks \@since 5.0.0
 * @internal
 */
export interface KeyboardFocusElementData {
  /**
   * The element that can be keyboard focused.
   */
  element: HTMLElement

  /**
   * The text content of the element that is used for searching. This will be
   * the empty string if the {@link KeyboardMovementBehavior.searchable} is
   * false
   */
  content: FunctionMaybe<string>
}

/**
 * This is a ref containing all the {@link KeyboardFocusElementData} that are
 * being watched by the {@link KeyboardMovementProvider}. This is generally used
 * to focus specific elements by index, attempt to find an element by search
 * text, or any additional custom focus behavior.
 *
 * @remarks \@since 5.0.0
 * @internal
 */
export type KeyboardFocusElementLookup = KeyboardFocusElementData[]

/**
 * @remarks \@since 5.0.0
 * @internal
 */
export interface KeyboardFocusContext
  extends Required<KeyboardMovementBehavior> {
  /** {@inheritDoc KeyboardMovementConfig} */
  config: ObservableMaybe<KeyboardMovementConfig>

  /**
   * A function that is used to add an element to the list of focusable
   * elements.
   */
  attach<E extends HTMLElement>(element: E): void

  /**
   * A function that is used to remove an element to the list of focusable
   * elements.
   */
  detach<E extends HTMLElement>(element: E): void

  /** {@inheritDoc KeyboardFocusElementLookup} */
  watching: KeyboardFocusElementLookup
}
