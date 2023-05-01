import { AppInfo, PageSchema } from "../interfaces/index.interface";

export const isNode =
  typeof process !== "undefined" && !!process?.versions?.node;

export const isBrowser = !isNode && typeof window !== "undefined";

export const getAppInfo = (host?: string): AppInfo => {
  if (isBrowser) {
    host = window.location.host;
  }

  const isLocal = process.env.NODE_ENV === "development";
  const defaultProtocol = `http${!isLocal ? "s" : ""}`;
  const hostname = host ?? (isLocal ? "localhost:3000" : "");
  const clientURL = `${defaultProtocol}://${hostname}`;
  const serverURL = `${clientURL}/api`;
  let env: "DEV" | "PROD" = isLocal ? "DEV" : "PROD";

  if (hostname.includes("localhost") || hostname.includes("run")) {
    env = "DEV";
  } else {
    env = "PROD";
  }

  //   const isDev = false;
  let actualEnv: "LOCAL" | "DEVELOP" | "PROD" = "DEVELOP";

  if (hostname.includes("localhost")) {
    actualEnv = "LOCAL";
  } else if (hostname.includes("vercel.app")) {
    actualEnv = "PROD";
  }

  const defaultAppInfo: AppInfo = {
    APP: {
      appName: "LOTR Showcase",
      appNameShort: "LOTR",
      appDescription: "The Lord Of The Rings Showcase.",
      appKeywords: "LOTR",
    },
    CONFIG: {
      ENVIRONMENT: env,
      ACTUAL_ENVIRONMENT: actualEnv,
      CLIENT_BASE_URL: clientURL,
      SERVER_BASE_URL: serverURL,
      WHITELIST_DOMAINS: `${clientURL},${serverURL}`,
    },
  };

  try {
    return defaultAppInfo;
  } catch (error) {
    return defaultAppInfo;
  }
};

export const generateAppPage = (pageData: PageSchema) => {
  const appPage = pageData;
  const AppInfo = getAppInfo();

  if (!appPage.realPath) {
    appPage.realPath = `${AppInfo.CONFIG.CLIENT_BASE_URL}${pageData.path}`;
  } else {
    // We need to set the canonical path if it does not exist
    if (!appPage.metadata.canonical) {
      appPage.metadata.canonical = `${AppInfo.CONFIG.CLIENT_BASE_URL}${appPage.realPath}`;
    }
  }

  if (appPage.metadata.og?.images.length === 0) {
    appPage.metadata.og.images = [
      {
        url: "images/logo.png",
        width: 1024,
        height: 1024,
        alt: "LOTR",
        type: "image/png",
      },
    ];
  }
  if (!appPage.metadata.description) {
    appPage.metadata.description = AppInfo.APP.appDescription;
  }
  if (!appPage.metadata.keywords) {
    appPage.metadata.keywords = AppInfo.APP.appKeywords.split(",");
  } else {
    appPage.metadata.keywords = [
      ...appPage.metadata.keywords,
      AppInfo.APP.appKeywords,
    ];
  }

  if (!appPage.metadata.canonical) {
    appPage.metadata.canonical = "https://LOTR.com/";
  }

  if (!appPage.metadata.themeColor) {
    appPage.metadata.themeColor = "#009688";
  }

  return appPage;
};

export const sleep = (delay = 0) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};
