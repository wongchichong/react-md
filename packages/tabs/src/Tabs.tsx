;
import { KeyboardMovementProvider } from "@react-md/utils"

import { Tab } from "./Tab"
import type { TabsListProps } from "./TabsList"
import { TabsList } from "./TabsList"
import { useTabs } from "./TabsManager"

export type TabsProps<T extends EventTarget =  HTMLDivElement> = Omit<
    TabsListProps<T>,
    "activeIndex" | "onActiveIndexChange"
>

/**
 * The `Tabs` component is used to render all the configured `tabs` from the
 * parent `TabsManager` component inside of the `TabsList`.
 */
export const Tabs = ({ ref, ...props }: TabsProps<HTMLDivElement>) => {
    const { tabsId, tabs, activeIndex, onActiveIndexChange } = useTabs()
    const horizontal = props.orientation !== "vertical"

    return (
        <KeyboardMovementProvider loopable horizontal={horizontal}>
            <TabsList
                {...props}
                id={tabsId}
                ref={ref}
                activeIndex={activeIndex}
                onActiveIndexChange={onActiveIndexChange}
            >
                {tabs.map(({ id, ...config }, index) => (
                    <Tab
                        {...config}
                        id={id}
                        active={activeIndex === index}
                        onClick={() => {
                            onActiveIndexChange(index)
                        }}
                    />
                ))}
            </TabsList>
        </KeyboardMovementProvider>
    )
}