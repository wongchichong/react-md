export interface ExpansionListProps<T extends EventTarget = HTMLDivElement> extends HTMLAttributes<T> {
    /**
     * This should be 2 or more expansion panel components.
     */
    children: Children

    /**
     * The keydown event handler that allows for focusing the next/previous panel
     * as well as the first/last with keyboard shortcuts. This is provided by the
     * `usePanels` hook automatically.
     */
    onKeyDown: ObservableMaybe<KeyboardEventHandler<T>>
}

/**
 * This component is honestly not very helpful since it does not apply any
 * styles. It is a simple wrapper for a `<div>` that updates the props to
 * require the `children` and `onKeyDown` props.
 */
export const ExpansionList = ({ children, ref, ...props }: ExpansionListProps<HTMLDivElement>) =>
    <div {...props} ref={ref}>
        {children}
    </div>
