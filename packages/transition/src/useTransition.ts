import { $, store, $$ } from 'voby'
import { useEnsuredRef, useIsomorphicLayoutEffect } from "@react-md/utils"

import type {
    TransitionHookOptions,
    TransitionHookReturnValue,
    TransitionStage,
    TransitionState,
} from "./types"
import { getTransitionTimeout } from "./utils"

const INITIAL_STATE: TransitionState = {
    appearing: false,
    rendered: true,
    stage: "exited",
}

/**
 * You'll most likely want to use the {@link useCSSTransition} hook instead
 * since this is just a low-level hook that can be used to transition using
 * timeouts.
 *
 * @typeParam E - The HTMLElement type used or the ref required for the
 * transition.
 * @remarks \@since 4.0.0
 */
export function useTransition<E extends HTMLElement>({
    nodeRef,
    timeout,
    transitionIn,
    reflow = false,
    temporary = false,
    appear = false,
    enter = true,
    exit = true,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
}: TransitionHookOptions<E>): TransitionHookReturnValue<E> {
    const configuration = {
        appear,
        timeout: getTransitionTimeout({ timeout, appear, enter, exit }),
        reflow,
        onEnter,
        onEntering,
        onEntered,
        onExit,
        onExiting,
        onExited,
    } as const
    const configurationRef = $(configuration)
    configurationRef(configuration)

    const [ref, refCallback] = useEnsuredRef<E>(nodeRef)
    const state = ((state: TransitionState) => {
        // const { appear, } = configuration.timeout
        // const { appearing } = state
        const update = (newState: TransitionState) => Object.assign(state, newState)

        const enter = (action: TransitionStage | "unmount") => {
            const { appear, enter } = configuration.timeout
            const { appearing } = state

            const duration = appearing ? appear : enter
            update({
                stage: $$(duration) > 0 ? "enter" : "entered",
                rendered: true,
                appearing,
            })
        }
        const entering = (action: TransitionStage | "unmount") =>
            update({
                stage: action as any,
                rendered: true,
                appearing: state.appearing,
            })

        const entered = entering

        const exit = () => {
            const { exit } = configuration.timeout
            const stage = $$(exit) > 0 ? "exit" : "exited"
            update({
                stage,
                rendered: !temporary || stage !== "exited",
                appearing: false,
            })
        }

        const exiting = (action: TransitionStage | "unmount") => update({
            stage: action as any,
            rendered: true,
            appearing: false,
        })

        const exited = exiting
        const unmount = () => update({
            stage: "exited",
            rendered: false,
            appearing: false,
        })

        return { state, enter, entering, entered, exit, exiting, exited, unmount, update }
    }

        // () =>
        // ({
        //   appearing: appear && transitionIn,
        //   rendered: !temporary || transitionIn,
        //   stage: transitionIn && !appear ? "entered" : "exited",
        // } as const)
    )(store(INITIAL_STATE))


    const isFirstRender = $(true)
    useIsomorphicLayoutEffect(() => {
        const { appearing, rendered, stage: stg } = state.state
        const stage = $$(stg)

        const {
            appear,
            timeout,
            reflow,
            onEnter,
            onEntering,
            onEntered,
            onExit,
            onExiting,
            onExited,
        } = configurationRef()

        if (isFirstRender()) {
            isFirstRender(false)
            if (appear && transitionIn) {
                state.enter('enter')
                // dispatch("enter")
            }

            return
        }

        // Cancel any exiting/exited transitions and instead immediately start the
        // enter transition
        if (transitionIn && stage.startsWith("exit")) {
            state.enter('enter')
            // dispatch("enter")
            return
        }

        // Cancel any entering/entered transitions and instead immediately start the
        // exit transition
        if (!transitionIn && stage.startsWith("enter")) {
            state.exit()
            // dispatch("exit")
            return
        }

        if (reflow && ref() && stage !== "exited" && stage !== "entered") {
            // force reflow by accessing scrollTop
            ref().scrollTop
        }

        let duration = 0
        let nextStage: TransitionStage = stage
        switch (stage) {
            case "enter":
                onEnter?.(appearing)
                nextStage = "entering"
                break
            case "entering":
                onEntering?.(appearing)
                duration = $$(timeout.enter)
                nextStage = "entered"
                break
            case "entered":
                onEntered?.(appearing)
                break
            case "exit":
                onExit?.()
                nextStage = "exiting"
                break
            case "exiting":
                onExiting?.()
                duration = $$(timeout.exit)
                nextStage = "exited"
                break
            case "exited":
                onExited?.()
                break
        }

        if (stage === nextStage) {
            if (stage === "exited" && temporary) {
                state.unmount()
                // dispatch("unmount")
            }

            return
        }

        if (duration <= 0) {
            state[nextStage](nextStage)
            // dispatch(nextStage)
            return
        }

        const timer = window.setTimeout(() => {
            state[nextStage](nextStage)
            // dispatch(nextStage)
        }, duration)

        return () => {
            window.clearTimeout(timer)
        }
    })

    return {
        ref: refCallback,
        stage: state.state.stage,
        rendered: state.state.rendered,
        appearing: state.state.appearing,
        transitionTo: state as any, //dispatch,
    }
}
