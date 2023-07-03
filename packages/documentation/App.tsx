import { useEffect , $} from "voby";
import { Typography } from "@react-md/typography";
import { Button } from "@react-md/button";
import { Chip } from "@react-md/chip";
import {
  AppBar,
  AppBarTitle,
  AppBarNav,
  AppBarAction,
} from "@react-md/app-bar";
import {Avatar} from "@react-md/avatar";
import { BadgedButton } from "@react-md/badge";
import { Form, FormMessage, TextField, Password } from "@react-md/form";
import {Divider} from '@react-md/divider';
import {LinearProgress, CircularProgress} from "@react-md/progress"
import { FontIcon } from "@react-md/icon";
import { AutoComplete } from "@react-md/autocomplete";
import {
  AccessAlarmFontIcon,
  AccessAlarmSVGIcon,
  Rotation3DFontIcon, // the sprite name for this was 3d_rotation.svg
  Rotation3DSVGIcon, // the sprite name for this was 3d_rotation.svg
  TvFontIcon,
  TvSVGIcon,
  HomeFontIcon,
  HomeSVGIcon,
  MenuSVGIcon, SearchSVGIcon, EmailSVGIcon
} from '@react-md/material-icons';
import { TabsManager, Tabs, TabPanels, TabPanel } from "@react-md/tabs";

import {
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@react-md/table";

import {
  ExpansionList,
  ExpansionPanel,
  usePanels,
} from "@react-md/expansion-panel";
import { List, ListItem, ListSubheader} from "@react-md/list";
import { Card, CardHeader, CardTitle, CardSubtitle, CardActions, CardContent } from "@react-md/card"
import { DropdownMenu, MenuItem } from "@react-md/menu";
import { MediaContainer } from "@react-md/media";
import { Tooltip, useTooltip } from "@react-md/tooltip";
import {useAddMessage} from "@react-md/alert"
import "@react-md/menu/dist/styles.scss"
import "@react-md/media/dist/styles.scss"

import "@react-md/table/dist/styles.scss"
import "@react-md/chip/dist/styles.scss"
import "@react-md/icon/dist/styles.scss"
import "@react-md/overlay/dist/styles.scss"
import "@react-md/form/dist/styles.scss"
import "@react-md/app-bar/dist/styles.scss"
import "@react-md/badge/dist/styles.scss"
import "@react-md/card/dist/styles.scss"
import "@react-md/list/dist/styles.scss"
import "@react-md/button/dist/styles.scss"
import "@react-md/typography/dist/styles.scss"
import "@react-md/avatar/dist/styles.scss"
import "@react-md/progress/dist/styles.scss"

function App(){
  const email = $("")
  const password = $("")  
  const fruits = [
    "Apple",
    "Apricot",
    "Banana",
    "Blueberry",
    "Cranberry",
    "Kiwi",
    "Peach",
    "Plum",
    "Strawberry",
  ];
  const [panels, onKeyDown] = usePanels({
    count: 3,
    idPrefix: "my-panel-group",
  });
  const [panel1Props, panel2Props, panel3Props] = panels;
  const tabs = ["Tab 1", "Tab 2", "Tab 3"];


  useEffect(() => {
    const head = document.querySelector("head")

    const links: HTMLLinkElement[] = []
    let href: string
    href = "https://fonts.googleapis.com/css2?family=Material+Icons"
    const link = document.createElement("link")

    link.rel = "stylesheet"
    link.href = href

    head.appendChild(link)
    links.push(link)
  
    return () => {
        links.forEach((link) => {
            head.removeChild(link)
        })
    }}
    )

  const addMessage = useAddMessage();
  return (
    <>
    <AppBar id="main-app-bar" theme={"secondary"}>
      <AppBarNav id="main-mobile-navigation">
        <MenuSVGIcon />
      </AppBarNav>
      <AppBarTitle>My Company's Name</AppBarTitle>
      <AppBarAction id="search" aria-label="Search">
        <SearchSVGIcon />
      </AppBarAction>
    </AppBar>
    <Divider/>  

    <Avatar color="cyan">R</Avatar>
  
    <List>
    <ListItem id="item-1">Item 1</ListItem>
    <ListItem id="item-2" secondaryText="This is secondary text">
      Item 2 Primary Text
    </ListItem>
    <ListItem id="item-3" disabled>
      Item 3 Disabled
    </ListItem>
    <Divider />
    <ListSubheader>Sub actions</ListSubheader>
    <ListItem id="item-4" leftAddon={<FontIcon>close</FontIcon>}>
      Close
    </ListItem>
    </List>
    <Divider/> 
    <Form onSubmit={()=>{console.log("submitted")}}>
      <FormMessage id="errors" role="alert" error disableWrap>
      </FormMessage>
      <TextField
        aria-describedby="errors"
        id="email"
        label="Email"
        type="email"
        name="email"
        value={email}
        onChange={(event) => email(event.currentTarget.value)}
        required
      />
      <Password
        aria-describedby="errors"
        id="password"
        label="Password"
        name="password"
        value={password}
        onChange={(event) => password(event.currentTarget.value)}
        required
      />
      </Form>
    <Divider/>
    {/* <Button {...elementProps}>Button Text</Button>
    <Tooltip {...tooltipProps}>I am a tooltip</Tooltip> */}

    {/* <DropdownMenu id="example-dropdown-menu" buttonChildren="Dropdown">
      <MenuItem onClick={() => console.log("Clicked Item 2")}>Item 2</MenuItem>
    </DropdownMenu> */}
    <BadgedButton id="notifications">3</BadgedButton>
    <LinearProgress
      id="determinate-linear-progress"
    />
    <CircularProgress id="testCircle"/>
    <div >
      <Typography type="headline-4">Font Icon Versions</Typography>
      <AccessAlarmFontIcon />
      <Rotation3DFontIcon />
      <HomeFontIcon />
      <TvFontIcon />
      <Typography type="headline-4">SVG Icon Versions</Typography>
      <AccessAlarmSVGIcon />
      <Rotation3DSVGIcon />
      <HomeSVGIcon />
      <TvSVGIcon />
    </div>
    <Divider/>
    <Card >
    <CardHeader>
      <CardTitle>Card Title</CardTitle>
    </CardHeader>
    <CardContent>
      <Typography>Here is some text to display in the card. It is</Typography>
    </CardContent>
    <CardActions>
      <Button>Action 1</Button>
      <Button>Action 2</Button>
    </CardActions>
    </Card>
    <Divider/>
    <Chip id="example-chip-1">I'm a chip!</Chip>;
    <Divider/> 

    <MediaContainer height={9} width={16}>
        <img src="https://picsum.photos/400/300?image=3" alt="" />
    </MediaContainer>
    <Divider/>
    <TableContainer>
    <Table lineWrap="padded" fullWidth>
      <TableHeader ariaSort={"ascending"}>
        <TableRow>
          <TableCell>Header 1</TableCell>
          <TableCell>Header 2</TableCell>
          <TableCell>Header 3</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 10 }, (_, i) => (
          <TableRow>
            <TableCell>{`Cell 1, row ${i + 1}`}</TableCell>
            <TableCell>{`Cell 2, row ${i + 1}`}</TableCell>
            <TableCell>{`Cell 3, row ${i + 1}`}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  <Divider/>

  {/* <TabsManager tabs={tabs} tabsId="tabs">
    <Tabs  />
    <TabPanels>
      <TabPanel>
        <Typography type="headline-4">Panel 1</Typography>
      </TabPanel>
      <TabPanel>
        <Typography type="headline-4">Panel 2</Typography>
      </TabPanel>
      <TabPanel>
        <Typography type="headline-4">Panel 3</Typography>
      </TabPanel>
    </TabPanels>
    </TabsManager>  */}


    </>
  );
}

export default App;