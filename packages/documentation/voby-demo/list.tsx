import { List, ListItem, ListSubheader } from "@react-md/list";
import { FontIcon } from "@react-md/icon";
import { render } from 'voby';

import "@react-md/list/dist/styles.scss"

const list = () => {
    return (
        <>
        <h1>List Demo</h1>
            <List>
                <ListItem id="item-1">Item 1</ListItem>
                <ListItem id="item-2" secondaryText="This is secondary text">
                    Item 2 Primary Text
                </ListItem>
                <ListItem id="item-3" disabled>
                    Item 3 Disabled
                </ListItem>
                <ListSubheader>Sub actions</ListSubheader>
                <ListItem id="item-4" leftAddon={<FontIcon>close</FontIcon>}>
                    Close
                </ListItem>
            </List>
        </>
    )
}

render(list, document.body)