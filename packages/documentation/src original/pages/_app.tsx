import "./app.scss"
import type { ReactElement } from "react"
import type { AppContext, AppInitialProps } from "next/app"
import NextApp from "next/app"
import Head from "next/head"
import Router from "next/router"
import type { AppSize } from "@react-md/utils"
import '@react-md/react'

import {
    DEFAULT_APP_SIZE,
    DEFAULT_DESKTOP_LARGE_MIN_WIDTH,
    DEFAULT_DESKTOP_MIN_WIDTH,
    DEFAULT_PHONE_MAX_WIDTH,
    DEFAULT_TABLET_MAX_WIDTH,
    DEFAULT_TABLET_MIN_WIDTH,
} from "@react-md/utils"
import MobileDetect from "mobile-detect"
import Layout from "components/Layout"
import type { ThemeMode } from "components/Theme"
import Theme, { getDefaultTheme } from "components/Theme"
import { GA_CODE } from "constants/github"
import { qsToString } from "utils/routes"
import { toBreadcrumbPageTitle } from "utils/toTitle"
import type { CodePreference } from "components/CodePreference"
import { getDefaultCodePreference } from "components/CodePreference"

interface NextWebVitalsMetrics {
    id: string
    label: string
    name: string
    startTime: number
    value: number
}

export function reportWebVitals(metrics: NextWebVitalsMetrics): void {
    if (
        process.env.NODE_ENV !== "production" &&
        typeof window !== "undefined" &&
        window.location.search.includes("?vitals")
    ) {
        // eslint-disable-next-line no-console
        console.debug(metrics)
    } else if (typeof (window as any).gtag === "function") {
        const { id, label, value, name } = metrics;
        (window as any).gtag("event", "web_vitals", {
            eventCategory:
                label === "web-vital" ? "Web Vitals" : "Next.js custom metric",
            eventAction: name,
            eventValue: Math.round(name === "CLS" ? value * 1000 : value),
            eventLabel: id,
            nonInteraction: true,
        })
    }
}

interface AppProps extends AppInitialProps {
    pageProps: {
        statusCode?: FunctionMaybe<Nullable<number>>
    }
    defaultSize: AppSize
    defaultTheme: ThemeMode
    defaultPreference: CodePreference
}

export default class App extends NextApp<AppProps> {
    static async getInitialProps({
        Component,
        ctx,
    }: AppContext): Promise<AppProps> {
        let pageProps = {}
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }

        let defaultSize
        let defaultTheme: ThemeMode = "light"
        if (ctx && ctx.req) {
            const { req } = ctx
            const md = new MobileDetect(req.headers["user-agent"] || "")
            const isTablet = !!md.tablet()
            const isPhone = !isTablet && !!md.mobile()
            const isDesktop = !isPhone && !isTablet
            const isLargeDesktop = isDesktop
            defaultSize = {
                isPhone,
                isTablet,
                isDesktop,
                isLargeDesktop,
                isLandscape: true,
            }
            defaultTheme = getDefaultTheme(req.cookies)
        } else if (typeof window !== "undefined") {
            const matchesPhone = window.matchMedia(
                `screen and (max-width: ${DEFAULT_PHONE_MAX_WIDTH})`
            ).matches
            const matchesTablet = window.matchMedia(
                `screen and (min-width: ${DEFAULT_TABLET_MIN_WIDTH}) and (max-width: ${DEFAULT_TABLET_MAX_WIDTH})`
            ).matches
            const isDesktop = window.matchMedia(
                `screen and (min-width: ${DEFAULT_DESKTOP_MIN_WIDTH})`
            ).matches
            const isLargeDesktop = window.matchMedia(
                `screen and (min-width: ${DEFAULT_DESKTOP_LARGE_MIN_WIDTH})`
            ).matches

            const isTablet = !isDesktop && matchesTablet
            const isPhone = !isTablet && !isDesktop && matchesPhone
            const isLandscape = window.innerWidth > window.innerHeight
            defaultSize = {
                isPhone,
                isTablet,
                isDesktop,
                isLargeDesktop,
                isLandscape,
            }
            defaultTheme = getDefaultTheme()
        }

        return {
            pageProps,
            defaultSize: defaultSize || DEFAULT_APP_SIZE,
            defaultTheme,
            defaultPreference: getDefaultCodePreference(ctx?.req?.cookies),
        }
    }

    public componentDidMount(): void {
        Router.events.on("routeChangeComplete", this.handleRouteChange)
    }

    public componentWillUnmount(): void {
        Router.events.off("routeChangeComplete", this.handleRouteChange)
    }

    private handleRouteChange = (url: string): void => {
        if (
            process.env.NODE_ENV === "production" &&
            typeof (window as any).gtag === "function"
        ) {
            (window as any).gtag("config", GA_CODE, {
                page_title: toBreadcrumbPageTitle(url),
                page_path: url,
            })
        }
    };

    private getPathname = (): string => {
        const { pathname, query } = this.props.router

        return Object.entries(query).reduce(
            (resolved, [key, value]) =>
                resolved.replace(`[${key}]`, qsToString(value)),
            pathname
        )
    };

    public render(): Child {
        const {
            Component,
            pageProps,
            defaultSize,
            defaultTheme,
            defaultPreference,
        } = this.props
        const { statusCode } = pageProps
        const pathname = this.getPathname()
        const pageTitle = toBreadcrumbPageTitle(pathname, statusCode)

        return (
            <>
                <Head>
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1, shrink-to-fit=no"
                    />
                    <meta name="theme-color" content="#000000" />
                    <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
                    <title>{pageTitle}</title>
                </Head>
                <Theme defaultTheme={defaultTheme}>
                    <Layout
                        defaultSize={defaultSize}
                        defaultPreference={defaultPreference}
                        pathname={pathname}
                        title={pageTitle}
                    >
                        <Component {...pageProps} />
                    </Layout>
                </Theme>
            </>
        )
    }
}
