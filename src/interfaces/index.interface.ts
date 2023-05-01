export interface IPageMetadata {
  title: string;
  description?: string;
  keywords?: string[];
  themeColor?: string;
  noIndex?: boolean;
  noFollow?: boolean;
  canonical?: string;
  languageAlternates?: {
    hrefLang: string;
    href: string;
  };
  og?: {
    title: string;
    description: string;
    images: {
      url: string;
      width: number;
      height: number;
      alt: string;
      type: string;
    }[];
    video: {
      actors: {
        profile: string;
        role: string;
      };
      directors: string[];
      writers: string[];
      duration: number;
      releaseDate: string;
      tags: string[];
    }[];
    audio: {
      url: string;
      secureUrl: string;
      type: string;
    }[];
    siteName: string;
    locale: string;
  };
}

export interface PageSchema {
  path: string;
  realPath?: string;
  metadata: IPageMetadata;
}

export interface AppConfig {
  ENVIRONMENT: "DEV" | "PROD";
  ACTUAL_ENVIRONMENT: "LOCAL" | "DEVELOP" | "STAGING" | "PROD";
  CLIENT_BASE_URL: string;
  SERVER_BASE_URL: string;
  WHITELIST_DOMAINS: string;
}

export interface AppInfo {
  APP: {
    appName: string;
    appNameShort: string;
    appDescription: string;
    appKeywords: string;
  };
  CONFIG: AppConfig;
}

export interface AppState {
  appMargin: number;
  setAppMargin?: any;
}

export interface IApiError {
  name: string;
  cause?: unknown;
  code: string | number;
  message: string;
}
