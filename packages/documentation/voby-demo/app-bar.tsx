import { render, useEffect } from "voby";
import {
    AppBar,
    AppBarTitle,
    AppBarNav,
    AppBarAction,
    APP_BAR_OFFSET_CLASSNAME,
} from "@react-md/app-bar";
import { MenuSVGIcon, SearchSVGIcon } from "@react-md/material-icons";
import "@react-md/app-bar/dist/styles.scss"


const App_Bar = () => {
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
        }
    }
    )
    const mobile = window.innerWidth < 600;

    return (
        <>
            <h1>App Bar Simple Usage</h1>
            <AppBar id="main-app-bar" theme={"secondary"}>
                <AppBarNav id="main-mobile-navigation">
                    <MenuSVGIcon />
                </AppBarNav>
                <AppBarTitle>My Company's Name</AppBarTitle>
                <AppBarAction id="search" aria-label="Search">
                    <SearchSVGIcon />
                </AppBarAction>
            </AppBar>

        </>
    );
};

render(<App_Bar />, document.body);

