import {
  createTheme,
  CssBaseline,
  PaletteOptions,
  responsiveFontSizes,
  ThemeOptions,
  useMediaQuery,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";

type IMuiThemeOptions = ThemeOptions;
interface BaseThemeProps {
  children?: React.ReactNode;
  customTheme?: IMuiThemeOptions;
  colorMode?: "light" | "dark" | "system";
  fontConfig?: any;
  iconFontConfig?: any;
}

export const BaseTheme: React.FC<BaseThemeProps> = ({
  children,
  customTheme,
  colorMode,
  fontConfig,
  iconFontConfig,
}) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const lightPalette: PaletteOptions = {
    primary: {
      main: "#009688",
      light: "#33ab9f",
      dark: "#00695f",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ffc400",
      light: "#ffcf33",
      dark: "#b28900",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.60)",
      disabled: "rgba(0, 0, 0, 0.38)",
    },
    background: {
      default: "#fefefe",
    },
  };
  const darkPalette: PaletteOptions = {
    primary: lightPalette.primary,
    secondary: lightPalette.secondary,
    text: {
      primary: "rgba(255, 255, 255, 1)",
      secondary: "rgba(255, 255, 255, 0.75)",
      disabled: "rgba(255, 255, 255, 0.50)",
    },
    background: {
      default: "#101010",
      paper: "#151515",
    },
  };
  const theme: IMuiThemeOptions = {
    palette: {
      mode:
        colorMode === "system" || !colorMode
          ? prefersDarkMode
            ? "dark"
            : "light"
          : "light",
      ...(prefersDarkMode ? darkPalette : lightPalette),
    },
    typography: {
      fontFamily: `${fontConfig.style.fontFamily}, sans-serif`,
    },
    spacing: 8,
    shape: {
      borderRadius: 4,
    },
    transitions: {
      duration: {
        shortest: 150,
        shorter: 200,
        short: 250,
        // most basic recommended timing
        standard: 300,
        // this is to be used in complex animations
        complex: 375,
        // recommended when something is entering screen
        enteringScreen: 225,
        // recommended when something is leaving screen
        leavingScreen: 195,
      },
    },
    components: {
      MuiIcon: {
        defaultProps: {
          baseClassName: iconFontConfig
            ? iconFontConfig.className
            : "material-symbols-outlined",
          sx: {
            fontWeight: "normal",
            fontStyle: "normal",
            fontSize: "24px",
            lineHeight: "1",
            letterSpacing: "normal",
            textTransform: "none",
            display: "inline-block",
            whiteSpace: "nowrap",
            wordWrap: "normal",
            direction: "ltr",
          },
        },
      },
      MuiBadge: {
        defaultProps: {
          sx: {
            zIndex: 100000,
          },
        },
      },
    },
    // shadows: Array(25).fill('none') as Shadows,
  };

  const custom = responsiveFontSizes(
    createTheme(customTheme ? { ...theme, ...customTheme } : theme)
  );

  return (
    <ThemeProvider theme={custom}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
