import type { ReactElement } from 'voby'
import { $ } from 'voby'
import { Checkbox, Select } from "@react-md/form"
import type { ConfigurableIcons } from "@react-md/icon"
import { IconProvider, TextIconSpacing, useIcon } from "@react-md/icon"
import { 
 ArrowDropDownSVGIcon, 
 CheckBoxSVGIcon, 
 ArrowDropDownFontIcon,  } from "@react-md/material-icons"
import { Typography } from "@react-md/typography"
import { Grid } from "@react-md/utils"

// Note: If you want to enforce all icons should be updated, you can
// switch to the `ConfiguredIcons` interface which is really just a
// simple wrapper of `Required<ConfigurableIcons>`
const overrides: ConfigurableIcons = {
    checkbox: <CheckBoxSVGIcon />,
    dropdown: <ArrowDropDownSVGIcon />,
}

function PulledFromContext(): Child {
    const icon = useIcon("dropdown")

    // I'm cheating a little bit for this demo, you probably shouldn't reference
    // the `rmd-text-icon-spacing` class name as it might be removed at some point
    return (
        <div className="rmd-text-icon-spacing">
            <TextIconSpacing icon={icon} iconAfter>
                <Typography>Dropdown Icon</Typography>
            </TextIconSpacing>
        </div>
    )
}

export default function OverridingDefaultIcons(): Child {
    const value1 = $("")
    const value2 = $("")
    return (
        <IconProvider {...overrides}>
            <Grid clone columns={1} desktopColumns={2}>
                <Select
                    id="select-1"
                    label="Inherits"
                    placeholder="Item..."
                    options={Array.from({ length: 10 }, (_, i) => `Item ${i + 1}`)}
                    value={value1}
                    onChange={(value) => value1(value)}
                />
                <Select
                    id="select-2"
                    label="Prop Overrides"
                    placeholder="Item..."
                    options={Array.from({ length: 10 }, (_, i) => `Item ${i + 1}`)}
                    value={value2}
                    onChange={(value) => value2(value)}
                    rightChildren={<ArrowDropDownFontIcon />}
                />
                <Checkbox id="checkbox-1" name="checkbox" label="Checkbox inherits" />
                <PulledFromContext />
            </Grid>
        </IconProvider>
    )
}
