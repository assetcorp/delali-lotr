import React from "react";
import "@/src/styles/App.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { DefaultSeo, NextSeoProps } from "next-seo";
import { generateAppPage, getAppInfo } from "@/src/utils/index.utils";
import { PageSchema } from "@/src/interfaces/index.interface";
import { BaseTheme } from "@/src/providers/theme.provider";
import { Barlow } from "next/font/google";
import localFonts from "next/font/local";
import Wrapper from "@/src/components/Wrapper.component";
import { AppProvider } from "@/src/providers/app.provider";
import Header from "@/src/components/Header.component";
import MainApp from "@/src/components/MainApp.component";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const barlow = Barlow({
  weight: ["100", "300", "400", "600", "700", "900"],
  subsets: ["latin", "latin-ext"],
});
const materialSymbols = localFonts({
  src: "../src/static/material-symbols.woff2",
  weight: "100 700",
  variable: "--material-symbols",
});

const reactQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

export default function App({ Component, pageProps, router }: AppProps) {
  const [isSSR, setIsSSR] = React.useState(true);
  const AppInfo = getAppInfo();

  let pageData: PageSchema = {
    path: router.pathname ?? "/",
    metadata: { title: "LOTR Showcase" },
  };
  if ("pageData" in pageProps) {
    pageData = pageProps.pageData;
  }

  const appPage = generateAppPage(pageData) as PageSchema & {
    metadata: { additionalMetaTags: any[] };
  };

  // Add additional meta tags
  appPage.metadata.additionalMetaTags = [];
  // Keywords
  if ("keywords" in appPage.metadata) {
    appPage.metadata.additionalMetaTags.push({
      name: "keywords",
      content: appPage.metadata.keywords?.join(", "),
    });
  }

  const seoTags: NextSeoProps = {
    ...(appPage.metadata as NextSeoProps),
    titleTemplate: `%s | ${AppInfo.APP.appNameShort}`,
    languageAlternates: [
      { hrefLang: "x-default", href: `${AppInfo.CONFIG.CLIENT_BASE_URL}/` },
    ],
  };

  React.useEffect(() => {
    setIsSSR(false);
  }, []);

  return (
    <div>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <DefaultSeo {...seoTags} />
      <div suppressHydrationWarning>
        {isSSR ? null : (
          <BaseTheme fontConfig={barlow} iconFontConfig={materialSymbols}>
            <QueryClientProvider client={reactQueryClient}>
              <AppProvider>
                <Wrapper>
                  <Header />
                  <MainApp>
                    <Component {...pageProps} />
                  </MainApp>
                </Wrapper>
              </AppProvider>
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </BaseTheme>
        )}
      </div>
    </div>
  );
}
