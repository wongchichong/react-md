
import {
    cloneElement,
    $,
    useEffect,
    $$,
}from 'voby'

import { bem, useEnsuredRef } from "@react-md/utils"
import { Children } from '@react-md/react'

import { useTabs } from "./TabsManager"
import type { TabPanelProps } from "./TabPanel"

export interface TabPanelsProps<T extends EventTarget = HTMLDivElement> extends HTMLAttributes<T> {
    /**
     * Boolean if this component should no longer automatically reset the scrolling
     * to the top when the panel changes.
     *
     * @defaultValue `false`
     */
    disableScrollFix?: FunctionMaybe<Nullable<boolean>>

    /**
     * Boolean if the swiping transition should be disabled. If you want to add
     * a custom transition, you'll need to wrap the `TabPanel`'s children in a
     * custom component that does appear and exit animations.
     *
     * @defaultValue `false`
     */
    disableTransition?: FunctionMaybe<Nullable<boolean>>

    /**
     * Boolean if the conditional rendering for the active tab panel only should
     * be disabled. This means that all the children will be visible in the DOM
     * instead of mounting and unmounting when their active state changes. The
     * panels will also be updated to ensure that inactive panels can not be
     * tab focusable.
     *
     * @defaultValue `false`
     */
    persistent?: FunctionMaybe<Nullable<boolean>>
}

const block = bem("rmd-tab-panels")

/**
 * This component allows you to control the visibility of the `TabPanel`
 * components and animating the next and current panels as needed. This works by
 * looping over all the children and getting the current `TabPanel` by the
 * `activeIndex`. This is why the children for this component can only be
 * `TabPanel` and should not be conditional.
 */
export const TabPanels = (
    {
        className,
        children,
        disableScrollFix = false,
        disableTransition = false,
        persistent = false,
ref:        forwardedRef,
        ...props
    }: TabPanelsProps<HTMLDivElement>
) =>{
    const { tabsId, tabs, activeIndex } = useTabs()
    const prevIndex = $(activeIndex)
    const state = $({
        previous: activeIndex,
        incrementing: true,
    })
    const { previous, incrementing }=state()


    // have to set these in refs since changing these might cause mounting
    // and unmounting in the Transition group component :/ they should only
    // be re-evaluated when the activeIndex changes.
    const transitionable = $(!persistent && !disableTransition)
    const animatable = $(persistent && !disableTransition)
    if (prevIndex(activeIndex)) {
        prevIndex(activeIndex)
        transitionable(!persistent && !disableTransition)
        animatable(persistent && !disableTransition)
    }

    useEffect(() => {
        state(({ previous }) => ({
            incrementing: previous < activeIndex,
            previous: disableTransition ? activeIndex : previous,
        }))

        // this is for only updating the incrementing state and should not be fired
        // again if the disableTransition prop is changed
        // eslint-disable-next-line react-hooks/exhaustive-deps
    })

    const onEntered = $(() => {
        state(({ incrementing }) => ({ incrementing, previous: activeIndex }))
    })

    const [ref, refHandler] = useEnsuredRef(forwardedRef)

    useEffect(() => {
        if (!ref() || disableScrollFix) {
            return
        }

        ref().scrollTop = 0
        // don't want it to be triggered if only the disableScrollFix prop has changed
        // since it might be independent from active indexes
        // eslint-disable-next-line react-hooks/exhaustive-deps
    })

    return (
        <div
            {...props}
            ref={refHandler}
            className={[
                block({
                    "slide-left": incrementing,
                    "slide-right": !incrementing,
                }),
                className
            ]}
        >
            {Children.map(children, (child, index) => {
                // if (!isValidElement<TabPanelProps>(child)) {
                //     return child
                // }

                const panel = Children.only(child) as Element
                let labelledBy = panel.getAttribute("aria-labelledby")
                if (!labelledBy && !panel.getAttribute("aria-label") && tabs[index]) {
                    // generally guaranteed to be defined by this point since the TabsManager
                    // will add ids if missing.
                    labelledBy = $$(tabs[index].id)
                }

                return cloneElement(child, {
                    "aria-labelledby": labelledBy,
                    id: `${tabsId}-panel-${index + 1}`,
                    hidden: persistent && index !== activeIndex && index !== previous,
                    temporary: !persistent,
                    transitionIn: index === activeIndex,
                    //@ts-ignore
                    timeout: disableTransition ? 0 : panel[timeout],
                    onEntered: disableTransition ? undefined : onEntered,
                })
            })}
        </div>
    )
}