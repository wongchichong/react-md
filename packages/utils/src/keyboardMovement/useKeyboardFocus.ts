import type {
  // FocusEventHandler,
  // JSX.TargetedKeyboardEvent,
  // KeyboardEventHandler,
  ObservableMaybe,
} from 'voby'
import { $, $$ } from 'voby'
import { useUserInteractionMode } from "../mode/UserInteractionModeListener"

import { findMatchIndex } from "../search/findMatchIndex"
import { useKeyboardFocusContext } from "./movementContext"
import {
  focusElement,
  getFirstFocusableIndex,
  getLastFocusableIndex,
  getNextFocusableIndex,
  isNotFocusable,
} from "./utils"

/**
 * @remarks \@since 5.0.0
 * @internal
 */
const noop = (): void => {
  // do nothing
}

/**
 * @remarks \@since 5.0.0
 */
export interface KeyboardFocusArg<E extends HTMLElement> {
  /**
   * The keyboard key/letter that was pressed. (`event.key`).
   */
  key: FunctionMaybe<string>

  /**
   * The keyboard event.
   */
  event: JSX.TargetedKeyboardEvent<E>
}

/**
 * @remarks \@since 5.0.0
 */
export type KeyboardFocusHandler<E extends HTMLElement> = (arg: KeyboardFocusArg<E>) => void

/**
 * Optional event handlers that can be called for specific custom focus
 * behavior. If any of these functions call `event.stopPropagation()`, the
 * default focus behavior will not occur.
 *
 * @remarks \@since 5.0.0
 */
export interface KeyboardFocusCallbacks<E extends HTMLElement> {
  onFocus?: FocusEventHandler<E>
  onKeyDown?: KeyboardEventHandler<E>

  /**
   * This is called whenever a single letter has been pressed and
   * {@link KeyboardMovementBehavior.searchable} is `true`.
   */
  onSearch?: KeyboardFocusHandler<E>

  /**
   * This is called whenever one of the
   * {@link KeyboardMovementBehavior.incrementKeys} are pressed.
   */
  onIncrement?: KeyboardFocusHandler<E>

  /**
   * This is called whenever one of the
   * {@link KeyboardMovementBehavior.decrementKeys} are pressed.
   */
  onDecrement?: KeyboardFocusHandler<E>

  /**
   * This is called whenever one of the
   * {@link KeyboardMovementBehavior.jumpToFirstKeys} are pressed.
   */
  onJumpToFirst?: KeyboardFocusHandler<E>

  /**
   * This is called whenever one of the
   * {@link KeyboardMovementBehavior.jumpToLastKeys} are pressed.
   */
  onJumpToLast?: KeyboardFocusHandler<E>
}

/**
 * @remarks \@since 5.0.0
 */
export interface KeyboardFocusHookOptions<E extends HTMLElement>
  extends KeyboardFocusCallbacks<E> {
  /**
   * A function that can be used to get the default focus index when the
   * container element first gains focus. If this returns `-1`, no child element
   * will be focused and the container will maintain focus instead.
   *
   * @param elements - The current list of elements that can be focused within
   * the container element
   * @param container - The container element that gained focus
   */
  getDefaultFocusIndex?(elements: readonly HTMLElement[], container: E): number

  /**
   * An optional function to call when the custom focused element should change.
   * The default value is just to call `element.focus()`.
   *
   * @param element - The element that should gain custom focus
   * @param nextFocusIndex - The next focus index which can be used for
   * additional movement behavior.
   */
  onFocusChange?(element: HTMLElement, nextFocusIndex: number): void
}

/** @remarks \@since 5.0.0 */
export interface KeyboardFocusHookReturnValue<E extends HTMLElement> {
  onFocus: FocusEventHandler<E>
  onKeyDown: KeyboardEventHandler<E>
  focusIndex: ObservableMaybe<number>
}

/**
 * @remarks \@since 5.0.0
 */
export function useKeyboardFocus<E extends HTMLElement>(
  options: KeyboardFocusHookOptions<E> = {}
): KeyboardFocusHookReturnValue<E> {
  const {
    onFocus = noop,
    onKeyDown = noop,
    onSearch = noop,
    onIncrement = noop,
    onDecrement = noop,
    onJumpToFirst = noop,
    onJumpToLast = noop,
    onFocusChange = focusElement,
    getDefaultFocusIndex,
  } = options
  const mode = useUserInteractionMode()
  const focusIndex = $(-1)
  const { config, loopable, searchable, watching, includeDisabled } =
    useKeyboardFocusContext()

  return {
    focusIndex,
    onFocus(event) {
      //@ts-ignore
      onFocus(event)
      //@ts-ignore
      if (event.isPropagationStopped()) {
        return
      }

      if (event.target !== event.currentTarget) {
        const i = $$(watching).findIndex(
          ({ element }) => element === event.target
        )
        if (i !== -1) {
          focusIndex(i)
        }
        return
      }

      let defaultFocusIndex: number
      if (getDefaultFocusIndex) {
        defaultFocusIndex = getDefaultFocusIndex(
          $$(watching).map(({ element }) => element),
          event.currentTarget
        )
      } else {
        defaultFocusIndex = getFirstFocusableIndex(
          $$(watching),
          $$(includeDisabled)
        )
      }

      // this makes it so that if you click the container element without
      // clicking any child, it doesn't focus the first element again
      if (defaultFocusIndex === -1 || mode !== "keyboard") {
        return
      }

      focusIndex(defaultFocusIndex)
      const element = $$(watching)[focusIndex()]?.element
      element && onFocusChange($$(element), focusIndex())

    },
    onKeyDown(event) {
      //@ts-ignore
      onKeyDown(event)
      //@ts-ignore
      if (event.isPropagationStopped()) {
        return
      }

      const { key, altKey, ctrlKey, metaKey, shiftKey } = event
      const { incrementKeys, decrementKeys, jumpToFirstKeys, jumpToLastKeys } = $$(config)

      const update = (index: number): void => {
        event.preventDefault()
        event.stopPropagation()
        if (focusIndex(index)) {
          return
        }

        focusIndex(index)

        const element = $$(watching)[index]?.element
        element && onFocusChange($$(element), focusIndex())
      }

      if (
        searchable &&
        key.length === 1 &&
        // can't search with space since it is generally a click event
        key !== " " &&
        !altKey &&
        !ctrlKey &&
        !metaKey &&
        !shiftKey
      ) {
        onSearch({ key, event })
        //@ts-ignore
        if (event.isPropagationStopped()) {
          return
        }

        const values = $$(watching).map(({ content, element }) => {
          if (isNotFocusable(element, $$(includeDisabled))) {
            return ""
          }

          return $$(content)
        })

        update(findMatchIndex(key, values, focusIndex()))
      } else if ($$(jumpToFirstKeys).includes(key)) {
        onJumpToFirst({ key, event })
        //@ts-ignore
        if (event.isPropagationStopped()) {
          return
        }

        update(getFirstFocusableIndex($$(watching), $$(includeDisabled)))
      } else if ($$(jumpToLastKeys).includes(key)) {
        onJumpToLast({ key, event })
        //@ts-ignore
        if (event.isPropagationStopped()) {
          return
        }

        update(getLastFocusableIndex($$(watching), $$(includeDisabled)))
      } else if ($$(incrementKeys).includes(key)) {
        onIncrement({ key, event })
        //@ts-ignore
        if (event.isPropagationStopped()) {
          return
        }

        update(
          getNextFocusableIndex({
            loopable: $$(loopable),
            watching: $$(watching),
            increment: true,
            includeDisabled: $$(includeDisabled),
            currentFocusIndex: focusIndex(),
          })
        )
      } else if ($$(decrementKeys).includes(key)) {
        onDecrement({ key, event })
        //@ts-ignore
        if (event.isPropagationStopped()) {
          return
        }

        update(
          getNextFocusableIndex({
            loopable: $$(loopable),
            watching: $$(watching),
            increment: false,
            includeDisabled: $$(includeDisabled),
            currentFocusIndex: focusIndex(),
          })
        )
      }
    },
  }
}
