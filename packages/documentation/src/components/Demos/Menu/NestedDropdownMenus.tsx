import type { ReactElement } from 'voby'
import { $ } from 'voby'
import { Switch } from "@react-md/form"
import { 
 DropdownMenu, 
 MenuConfigurationProvider, 
 MenuItem,  } from "@react-md/menu"
import { Grid } from "@react-md/utils"
import InfiniteDropdownMenu from "./InfiniteDropdownMenu"

export default function NestedDropdownMenus(): Child {
    const horizontal = $(false)
    return (
        <MenuConfigurationProvider horizontal={horizontal}>
            <Grid columns={1} wrapOnly>
                <Switch
                    id="nested-dropdown-menus-horizontal"
                    label="Horizontal"
                    name="horizontal"
                    checked={horizontal}
                    onChange={(event) => horizontal(event.currentTarget.checked)}
                />
                <DropdownMenu id="nested-dropdown-menus" buttonChildren="Dropdown">
                    <MenuItem>Item 1</MenuItem>
                    <MenuItem>Item 2</MenuItem>
                    <InfiniteDropdownMenu depth={0} index={0} />
                    <MenuItem>Item 4</MenuItem>
                    <MenuItem>Item 5</MenuItem>
                </DropdownMenu>
            </Grid>
        </MenuConfigurationProvider>
    )
}
