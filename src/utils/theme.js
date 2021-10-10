import { createTheme } from "@mui/material/styles";

// images
import rootBgPattern from '../assets/background/outer-bg-pattern-opacity30.png';

// colors
const cafeNoir = "rgba(76, 43, 0, 1)";
const unbleachedSilk = "rgba(255, 219, 205, 1)";
const persianOrange = "rgba(223, 141, 74, 1)";
// const brownSugar = "rgba(184, 125, 102, 1)";
const sunGlow = "rgba(246, 222, 109, 1)";
const columbiaBlue = "rgb(210, 238, 255)";

export const theme = createTheme ({
  palette: {
    mode: 'light',
    primary: {
      main: cafeNoir,
      light: unbleachedSilk
    },
    secondary: {
      main: persianOrange,
      contrastText: '#fff'
    },
    background: {
      // default, is not used as root background (see components below)
      default: cafeNoir,
      paper: unbleachedSilk
    },
    sunGlow: {
      main: sunGlow,
      contrastText: 'white'
    },
    cafeNoir: {
      main: cafeNoir
    },
    columbiaBlue: {
      main: columbiaBlue
    }
  },
  shape: {
    borderRadius: 11,
  },
  typography: {
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
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: "#fff",
          backgroundImage: `url("${rootBgPattern}")`,
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        color: "sunGlow",
      },
    },
    MuiAccordion: {
      defaultProps: {
        square: true,
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: columbiaBlue
        }
      }
    },
    MuiCard: {
      variants: [
        {
          props: { variant: 'fullHeight' },
          style: {
            height: "100%"
          }
        }
      ]
    },
    MuiButton: {
      variants: [
        {
          props: { size: 'xlarge' },
          style: {
            padding: "14px 22px",
            fontSize: "1rem"
          }
        }
      ]
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: 40,
          borderRadius: 11,
          border: "5px solid lightgray"
        },
        barColorPrimary: {
          backgroundColor: sunGlow,
        },
        colorPrimary: {
          backgroundColor: "lightgray",
        },
      }
    },

  }
  // components: {
  //   // todo: validate all styles below - Do we need these changes globally?
  //   MuiBadge: {
  //     styleOverrides: {
  //       badge: {
  //         background: blueGrey[50],
  //         color: blueGrey[800],
  //         border: "1px solid" + blueGrey[500],
  //       },
  //       colorSecondary: {
  //         border: 0,
  //       },
  //       colorError: {
  //         border: 0,
  //         color: "#fff",
  //       },
  //     }
  //   },
  //   MuiTooltip: {
  //     styleOverrides: {
  //       tooltip: {
  //         color: "#fff",
  //       },
  //     }
  //   },
  //   MuiIconButton: {
  //     styleOverrides: {
  //       root: {
  //         color: blueGrey[500],
  //       },
  //       colorSecondary: {
  //         color: blueGrey[50],
  //         zIndex: 10,
  //       },
  //     }
  //   },

  //   MuiCircularProgress: {
  //     styleOverrides: {
  //       colorSecondary: {
  //         color: blueGrey[50],
  //       },
  //     }
  //   },
  //   MuiTabs: {
  //     styleOverrides: {
  //       indicator: {
  //         backgroundColor: blueGrey[800],
  //       },
  //     }
  //   },
  //   MuiTab: {
  //     styleOverrides: {
  //       root: {
  //         "@media (min-width: 960px)": {
  //           minWidth: 120,
  //         },
  //       },
  //       textColorSecondary: {
  //         color: blueGrey[400],
  //         "&$selected": {
  //           color: blueGrey[900],
  //         },
  //       },
  //     }
  //   },
  //   MuiBottomNavigation: {
  //     styleOverrides: {
  //       root: {
  //         zIndex: 1190,
  //         backgroundColor: blueGrey[50],
  //         background: "linear-gradient(315deg," + blueGrey[600] + "," + blueGrey[800] + ")",
  //       },
  //     }
  //   },
  //   MuiBottomNavigationAction: {
  //     styleOverrides: {
  //       root: {
  //         color: blueGrey[100],
  //         "&$selected": {
  //           color: "#fff",
  //         },
  //       },
  //     }
  //   },
  //   MuiAvatar: {
  //     styleOverrides: {
  //       colorDefault: {
  //         color: blueGrey[800],
  //         backgroundColor: blueGrey[100],
  //       },
  //       square: {
  //         backgroundColor: "transparent",
  //       },
  //     }
  //   },
  //   MuiCardMedia: {
  //     styleOverrides: {
  //       root: {
  //         height: 220,
  //       },
  //     }
  //   },
  // }
});
