import type { ReactElement, ReactNode } from 'voby'
import { useMemo, $ } from 'voby'

import { 
 APP_BAR_OFFSET_DENSE_CLASSNAME, 
 APP_BAR_OFFSET_PROMINENT_DENSE_CLASSNAME,  } from "@react-md/app-bar"
import { useAppSize, useToggle, PhoneOnly } from "@react-md/utils"

import type { ConditionalFullPageDialogProps } from "../../components/ConditionalFullPageDialog"
import ConditionalFullPageDialog from "../../components/ConditionalFullPageDialog"

import { PhoneContext } from "./context"
import DefaultAppBar from "./DefaultAppBar"
import StatusBar from "./StatusBar"
import ClosePhone from "./ClosePhone"

import styles from "./Phone.module.scss"

export interface PhoneConfiguration {
    /**
     * An optional app bar to use within the phone. This should normally contain the `ClosePhone`
     * component so that it can be hidden on mobile devices when the full page dialog is used.
     */
    appBar?: ReactNode

    /**
     * The title to use for the phone. This will be passed down into the phone context so it can
     * be grabbed anywhere.
     */
    title?: ReactNode

    /**
     * A class name to apply to the fake phone's content element.
     */
    contentClassName?: Class

    /**
     * Boolean if the phone's content should gain the stacked styles which update
     * the content to be display flex and flex-direction column. THis is great
     * when creating a custom app bar that isn't fixed to the top with position
     * fixed.
     */
    contentStacked?: FunctionMaybe<Nullable<boolean>>

    /**
     * Boolean if the phone's app bar should be prominent. This is used to add the
     * required offset class names to the content element.
     */
    prominent?: FunctionMaybe<Nullable<boolean>>

    /**
     * Boolean if the `children` should always be forced to have the fab offset
     * class even when not being emulated
     */
    fabOffset?: FunctionMaybe<Nullable<boolean>>
}

export interface PhoneProps
    extends PhoneConfiguration,
    Pick<
        ConditionalFullPageDialogProps,
        "disableAppBar" | "disableContent" | "disableFocusOnMount"
    > {
    /**
     * An id for the phone. This is required for accessibility and quickly linking
     * to things.
     */
    id: string

    /**
     * The content to display. This will conditionally render in a full page
     * dialog.
     */
    children: ReactNode

    /**
     * A class name to apply to the fake phone's container element.
     */
    className?: Class

    /**
     * An optional function to call when the dialog is closed. This is useful if
     * the demo should be reset when the full page dialog is closed.
     */
    onPhoneClose?: () => void

    /**
     * Boolean if the `appBar` should only render a status bar.
     */
    statusBar?: FunctionMaybe<Nullable<boolean>>
}

const DEFAULT_APP_BAR = <DefaultAppBar />

export default function Phone({
    id,
    title = "Example",
    children,
    appBar = DEFAULT_APP_BAR,
    className,
    contentClassName,
    contentStacked: stacked = false,
    prominent,
    disableAppBar = false,
    disableContent = false,
    disableFocusOnMount = false,
    onPhoneClose,
    statusBar = false,
}: PhoneProps): Child {
    const { isPhone } = useAppSize()
    const [visible, enable, disable] = useToggle(false)
    const closePhone = (() => {
        disable()
        if (onPhoneClose) {
            onPhoneClose()
        }
    })

    if (visible && !isPhone) {
        closePhone()
    }

    const value = useMemo(() => ({
            id,
            title,
            closePhone,
        }))

    return (
        <PhoneContext.Provider value={value}>
            <ConditionalFullPageDialog
                id={id}
                disabled={!isPhone}
                enable={enable}
                disable={closePhone}
                visible={visible}
                disableAppBar={disableAppBar || statusBar}
                disableContent={disableContent}
                disableFocusOnMount={disableFocusOnMount}
            >
                <div
                    id={`${id}-phone`}
                    className={cn(
                        styles.phone,
                        styles.fabOffset,
                        {
                            [styles.emulated]: !isPhone,
                        },
                        className
                    )}
                >
                    {(statusBar && <StatusBar id={id} isPhone={isPhone} />) || appBar}
                    <div
                        id={`${id}-content`}
                        className={cn(
                            styles.content,
                            {
                                [styles.flexColumn]: stacked,
                                [APP_BAR_OFFSET_DENSE_CLASSNAME]:
                                    !statusBar && appBar && !isPhone,
                                [APP_BAR_OFFSET_PROMINENT_DENSE_CLASSNAME]:
                                    !statusBar && appBar && !isPhone && prominent,
                            },
                            contentClassName
                        )}
                    >
                        {children}
                        {statusBar && (
                            <PhoneOnly>
                                <ClosePhone floating />
                            </PhoneOnly>
                        )}
                    </div>
                </div>
            </ConditionalFullPageDialog>
        </PhoneContext.Provider>
    )
}
