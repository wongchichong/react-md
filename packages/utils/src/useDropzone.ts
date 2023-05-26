// import type { DragEvent, HTMLAttributes } from 'voby';
import { $ } from 'voby'

/**
 * @remarks \@since 2.9.0
 * @deprecated \@since 5.1.3 Use `DropzoneHandlers` instead.
 */
export type DropzoneHanders<E extends HTMLElement> = DropzoneHandlers<E>

/** @remarks \@since 5.1.3 */
export type DropzoneHandlers<E extends HTMLElement> = Pick<
    HTMLAttributes<E>,
    "onDragEnter" | "onDragOver" | "onDrop" | "onDragLeave"
>

/** @remarks \@since 2.9.0 */
export type DropzoneHookReturnValue<E extends HTMLElement> = [
    boolean,
    DropzoneHandlers<E>
]

/**
 * This hook can be used to implement simple drag-and-drop behavior for file
 * uploads or special styles while dragging an element over a part of a page.
 *
 * @example
 * Simple File
 * ```ts
 * const style: CSSProperties = {
 *   border: '1px solid blue',
 * };
 *
 * function Example(): Element {
 *   const { onDrop } = useFileUpload()
 *   const [isOver, handlers] = useDropzone({
 *     onDrop: (event) => {
 *       // normally use the `onDrop` behavior from `useFileUpload` to upload
 *       // files:
 *       // onDrop(event);
 *     }
 *   });
 *
 *   return (
 *     <div {...handlers} style={isOver ? style : {}}>
 *       Drag and drop some files!
 *       {isOver && <UploadSVGIcon />}
 *     </div>
 *   );
 * }
 * ```
 *
 * @see {@link useFileUpload} for a more complex example
 * @param options - The {@link DropzoneHandlers} that can be merged with the
 * default functionality.
 * @returns the {@link DropzoneHookReturnValue}
 * @remarks \@since 2.9.0
 */
export function useDropzone<E extends HTMLElement>(
    options: DropzoneHandlers<E>
): DropzoneHookReturnValue<E> {
    const {
        onDragEnter: propOnDragEnter,
        onDragOver: propOnDragOver,
        onDragLeave: propOnDragLeave,
        onDrop: propOnDrop,
    } = options
    const isOver = $(false)

    const onDragOver = $((event: DragEvent/*<E>*/) => {
        //@ts-ignore
        propOnDragOver?.(event)
        event.preventDefault()
        event.stopPropagation()
        isOver(true)
    })
    const onDragEnter = $((event: DragEvent/*<E>*/) => {
        //@ts-ignore
        propOnDragEnter?.(event)
        event.preventDefault()
        event.stopPropagation()
        isOver(true)
    })
    const onDrop = $((event: DragEvent/*<E>*/) => {
        //@ts-ignore
        propOnDrop?.(event)
        event.preventDefault()
        event.stopPropagation()
        isOver(false)
    })
    const onDragLeave = $((event: DragEvent/*<E>*/) => {
        //@ts-ignore
        propOnDragLeave?.(event)
        event.preventDefault()
        event.stopPropagation()

        if (
            !event.target ||
            event.currentTarget === event.target ||
            //@ts-ignore
            !event.currentTarget.contains(event.target as HTMLElement)
        ) {
            isOver(false)
        }
    })

    return [
        isOver(),
        {
            onDragOver,
            onDragEnter,
            onDrop,
            onDragLeave,
        },
    ]
}
