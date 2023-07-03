/* eslint-disable react/no-danger */
import type { ReactElement } from 'voby'
import type { DocumentInitialProps, DocumentContext } from "next/document"
import Document, { Html, Head, Main, NextScript } from "next/document"
import Cookie from "js-cookie"

import Analytics from "components/Analytics"
import type { ThemeMode } from "components/Theme"

interface MyDocumentProps {
    theme: ThemeMode
}

const PRISM_MANUAL_MODE =
    "window.Prism=window.Prism||{};window.Prism.manual=true"

export default class MyDocument extends Document<MyDocumentProps> {
    static async getInitialProps(
        ctx: DocumentContext
    ): Promise<DocumentInitialProps & MyDocumentProps> {
        const initialProps = await Document.getInitialProps(ctx)
        let theme = "light"
        if (ctx && ctx.req) {
            ({ theme = "light" } = ctx.req.cookies ?? {})
        } else if (typeof window !== "undefined") {
            theme = Cookie.get("theme") || "light"
        }

        return {
            ...initialProps,
            theme: theme === "dark" ? "dark" : "light",
        }
    }

    public render(): Child {
        const { theme } = this.props
        return (
            <Html lang="en" dir="ltr" className={`${theme}-theme`}>
                <Head>
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
                    />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap"
                    />
                </Head>
                <body>
                    <Main />
                    <script dangerouslySetInnerHTML={{ __html: PRISM_MANUAL_MODE }} />
                    <NextScript />
                    <Analytics />
                </body>
            </Html>
        )
    }
}
