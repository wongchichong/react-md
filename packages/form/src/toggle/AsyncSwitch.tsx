import type { CSSProperties } from 'voby'
import { $$ } from 'voby'

import { CircularProgress, getProgressA11y } from "@react-md/progress"

import type { SwitchProps } from "./Switch"
import { Switch } from "./Switch"

//@ts-ignore
export interface AsyncSwitchProps extends SwitchProps {
    /**
     * Boolean if the switch is still loading. This will "disable" the switch and
     * add the circular progress indicator in the switch's ball until it is set
     * back to false.
     */
    loading: boolean

    /**
     * An optional style to apply to the progress bar while the loading state is
     * enabled.
     */
    progressStyle?: FunctionMaybe<Nullable<string | StyleProperties>>

    /**
     * An optional class name to apply to the progress bar while the loading state
     * is enabled.
     */
    progressClassName?: Class
}

// this is used while the loading state is enabled to "disable" the switch
// toggle. If we disable the entire switch, keyboard focus is lost which is not
// desired.
const noop = (): void => {
    // do nothing
}

/**
 * This component will create an async switch that will show a loading indicator
 * and prevent the switch from being toggled while the loading state is true.
 */
export const AsyncSwitch = (
    {
        id,
        disabled,
        className,
        progressStyle,
        progressClassName,
        loading,
        onChange,
        ref,
        ...props
    }: AsyncSwitchProps
) => {
    const progressId = `${id}-loading`
    return (
        <Switch
            {...props}
            {...getProgressA11y(progressId, loading)}
            id={id}
            ref={ref}
            disabled={disabled}
            className={["rmd-switch--async", className]}
            labelDisabled={$$(disabled) || false}
            onChange={loading ? noop : onChange}
        >
            {/* @ts-ignore */}
            {loading && <CircularProgress
                id={progressId}
                //@ts-ignore
                style={progressStyle}
                className={["rmd-switch__progress", progressClassName]}
                centered={false}
            />
            }
        </Switch>
    )
}
