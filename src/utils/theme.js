import { createTheme } from "@mui/material/styles";
import { blueGrey, purple, pink } from "@mui/material/colors";

// new color scheme based on Ethereum diamond
//const red = "rgb(255, 156, 146)";
//const purple = "rgba(205, 113, 194, 1)";
//const purpleLight = "rgba(205, 113, 194, 0.7)";
//const blue = "rgb(90, 157, 237)";
//const teal = "rgba(83, 211, 224, 1)";
//const tealLight = "rgba(83, 211, 224, 0.7)";
//const green = "rgb(136, 216, 72)";
//const yellow = "rgb(255, 233, 77)";

export const theme = createTheme ({
  palette: {
    common: {
      black: "rgba(40, 31, 31, 1)",
      white: "#fff",
    },
    background: {
      paper: "#fff",
      default: "#ddd",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)",
    },
    primary: {
      light: purple[400],
      main: purple[600],
      dark: purple[900],
      contrastText: "#fff",
    },
    secondary: {
      light: "#53D3E0", // blueGrey[100],
      main: "#53D3E0", // blueGrey[300],
      dark: "#53D3E0", // blueGrey[600],
      contrastText: "#000",
    },
  },
  typography: {
    useNextVariants: true,
    fontFamily: ["system-ui", "sans-serif"].join(","),
  },
  overrides: {
    MuiAppBar: {
      colorDefault: {
        backgroundImage: "linear-gradient(0deg, " + blueGrey[50] + ", #ffffff)",
        "@media print": {
          display: "none",
        },
        boxShadow: "none",
      },
      colorPrimary: {
        color: blueGrey[50],
        backgroundImage: "linear-gradient(90deg, " + purple[600] + ", " + pink[600] + ")",
        "@media print": {
          display: "none",
        },
      },
      colorSecondary: {
        backgroundColor: "transparent",
        boxShadow: "none",
        borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
        "@media print": {
          display: "none",
        },
      },
    },
    MuiBadge: {
      badge: {
        background: blueGrey[50],
        color: blueGrey[800],
        border: "1px solid" + blueGrey[500],
      },
      colorSecondary: {
        border: 0,
      },
      colorError: {
        border: 0,
        color: "#fff",
      },
    },
    MuiTooltip: {
      tooltip: {
        color: "#fff",
      },
    },
    MuiIconButton: {
      root: {
        color: blueGrey[500],
      },
      colorSecondary: {
        color: blueGrey[50],
        zIndex: 10,
      },
    },
    MuiButton: {
      contained: {
        "&$disabled": {
          backgroundImage: "none",
        },
      },
      containedPrimary: {
        backgroundImage: "linear-gradient(90deg, " + purple[600] + ", " + pink[600] + ")",
      },
      outlinedSecondary: {
        color: "#ffffff",
        borderColor: "#ffffff",
      },
    },
    MuiStepper: {
      root: {
        backgroundColor: "transparent",
        "@media print": {
          display: "none",
        },
      },
    },
    MuiLinearProgress: {
      root: {
        height: 15,
        borderRadius: 2,
      },
      dashedColorPrimary: {
        animation: "none",
        backgroundImage: "none",
        backgroundColor: blueGrey[200],
      },
      barColorPrimary: {
        backgroundColor: blueGrey[700],
      },
      colorPrimary: {
        backgroundColor: blueGrey[100],
      },
    },
    MuiCircularProgress: {
      colorSecondary: {
        color: blueGrey[50],
      },
    },
    MuiTypography: {
      colorTextSecondary: {
        color: blueGrey[400],
      },
      h1: {
        fontFamily: ["system-ui", "serif"].join(","),
        fontSize: "2.2rem",
        fontWeight: 300,
      },
      h2: {
        fontFamily: ["system-ui", "serif"].join(","),
        fontSize: "1.4rem",
        fontWeight: 300,
      },
      h3: {
        fontSize: "1.3rem",
      },
      h5: {
        fontSize: "1.1rem",
      },
      body1: {
        fontFamily: ["system-ui", "serif"].join(","),
      },
    },
    MuiTabs: {
      indicator: {
        backgroundColor: blueGrey[800],
      },
    },
    MuiTab: {
      root: {
        "@media (min-width: 960px)": {
          minWidth: 120,
        },
      },
      textColorSecondary: {
        color: blueGrey[400],
        "&$selected": {
          color: blueGrey[900],
        },
      },
    },
    MuiCardContent: {
      root: {
        paddingTop: 0,
      },
    },
    MuiBottomNavigation: {
      root: {
        zIndex: 1190,
        backgroundColor: blueGrey[50],
        background: "linear-gradient(315deg," + blueGrey[600] + "," + blueGrey[800] + ")",
      },
    },
    MuiBottomNavigationAction: {
      root: {
        color: blueGrey[100],
        "&$selected": {
          color: "#fff",
        },
      },
    },
    MuiAvatar: {
      colorDefault: {
        color: blueGrey[800],
        backgroundColor: blueGrey[100],
      },
      square: {
        backgroundColor: "transparent",
      },
    },
    MuiCardMedia: {
      root: {
        height: 220,
      },
    },
  },
});
