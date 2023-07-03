import type { ReactElement } from 'voby'
import { Suspense, $, useEffect } from 'voby'

import { APP_BAR_OFFSET_PROMINENT_CLASSNAME } from "@react-md/app-bar"
import { Button } from "@react-md/button"
import { RefreshSVGIcon, CloudDownloadSVGIcon } from "@react-md/material-icons"
import { getProgressA11y } from "@react-md/progress"
import { useAppSize } from "@react-md/utils"

import Phone from "components/Phone"
import useFakeLazyImport from "hooks/useFakeLazyImport"

import WithSuspenseAppBar from "./WithSuspenseAppBar"
import WithSuspenseFallback from "./WithSuspenseFallback"
import WithSuspenseFiles from "./WithSuspenseFiles"

import styles from "./WithSuspense.module.scss"

enum State {
    READY,
    LOADING,
    COMPLETED,
}

export default function WithSuspense(): Child {
    const state = $(State.READY)
    const stateRef = $(state())
    const key = $(Date.now())
    useEffect(() => {
        if (stateRef() === State.COMPLETED && state() === State.READY      key(Date.now())
        }

        stateRef(state())
    })

    const reset = (() => {
        state(State.READY)
    })
    const complete = (() => {
        state(State.COMPLETED)
    })

    const handleClick = (() => {
        switch (stateRef()) {
            case State.READY:
                state(State.LOADING)
                break
            case State.COMPLETED:
                reset()
            // no default
        }
    })
    const { isPhone } = useAppSize()

    const loading = state() === State.LOADING
    const completed = state() === State.COMPLETED

    const LazyComponent = useFakeLazyImport(WithSuspenseFiles, key())
    return (
        <Phone
            id="with-suspense"
            appBar={<WithSuspenseAppBar />}
            contentClassName={cn({
                [APP_BAR_OFFSET_PROMINENT_CLASSNAME]: isPhone,
            })}
            prominent
            disableAppBar
            disableContent
            onPhoneClose={reset}
        >
            <div
                id="suspense-main-content"
                {...getProgressA11y("with-suspense-progress", loading)}
            >
                <Button
                    id="fake-load"
                    onClick={handleClick}
                    disabled={loading}
                    theme="secondary"
                    themeType="contained"
                    buttonType="icon"
                    className={styles.button}
                    aria-label={completed ? "Restart Demo" : "Start Demo"}
                >
                    {completed ? <RefreshSVGIcon /> : <CloudDownloadSVGIcon />}
                </Button>
                {state !== State.READY && (
                    <Suspense fallback={<WithSuspenseFallback complete={complete} />}>
                        <LazyComponent />
                    </Suspense>
                )}
            </div>
        </Phone>
    )
}
