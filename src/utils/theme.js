import { createTheme } from "@mui/material/styles";
import { blueGrey } from "@mui/material/colors";

//const red = "rgb(255, 156, 146)";
const purple = "rgba(205, 113, 194, 1)";
const purpleLight = "rgba(205, 113, 194, 0.7)";
//const blue = "rgb(90, 157, 237)";
const teal = "rgba(83, 211, 224, 1)";
const tealLight = "rgba(83, 211, 224, 0.7)";
//const green = "rgb(136, 216, 72)";
//const yellow = "rgb(255, 233, 77)";

export const theme = createTheme ({
  mode: 'light',
  palette: {
    common: {
      black: "rgba(40, 31, 31, 1)",
      white: "#fff",
    },
    background: {
      paper: "#fff",
      default: "#f1f1f1",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)",
    },
    primary: {
      light: purpleLight,
      main: purple,
      dark: purple,
      contrastText: "#fff",
    },
    secondary: {
      light: tealLight,
      main: teal, 
      dark: teal,
      contrastText: "#000",
    },
  },
  typography: {
    // using Roboto by default
    h1: {
      fontSize: "3.052rem",
      fontWeight: 400
    },
    h2: {
      fontSize: "2.441rem",
      fontWeight: 400
    },
    h3: {
      fontSize: "1.953rem",
      fontWeight: 400
    },
    h4: {
      fontSize: "1.563rem",
      fontWeight: 400
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 400
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 400
    }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          // todo: other variants (square) is not excluded from these overrides
          borderRadius: "10px"
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "10px"
        },
      },
    },
    // todo: validate all styles below - Do we need these changes globally?
    MuiBadge: {
      styleOverrides: {
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
      }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          color: "#fff",
        },
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: blueGrey[500],
        },
        colorSecondary: {
          color: blueGrey[50],
          zIndex: 10,
        },
      }
    },
    MuiLinearProgress: {
      styleOverrides: {
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
      }
    },
    MuiCircularProgress: {
      styleOverrides: {
        colorSecondary: {
          color: blueGrey[50],
        },
      }
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: blueGrey[800],
        },
      }
    },
    MuiTab: {
      styleOverrides: {
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
      }
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          zIndex: 1190,
          backgroundColor: blueGrey[50],
          background: "linear-gradient(315deg," + blueGrey[600] + "," + blueGrey[800] + ")",
        },
      }
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          color: blueGrey[100],
          "&$selected": {
            color: "#fff",
          },
        },
      }
    },
    MuiAvatar: {
      styleOverrides: {
        colorDefault: {
          color: blueGrey[800],
          backgroundColor: blueGrey[100],
        },
        square: {
          backgroundColor: "transparent",
        },
      }
    },
    MuiCardMedia: {
      styleOverrides: {
        root: {
          height: 220,
        },
      }
    },
  }
});
