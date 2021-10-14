// material-ui
import { createTheme } from "@mui/material/styles";
import buttonClasses from '@mui/material/Button/buttonClasses'
import { alpha } from '@mui/material'

// images
import rootBgPattern from '../assets/background/outer-bg-pattern-opacity30.png';

// colors
const cafeNoir = "rgba(55, 16, 13, 1)";
const unbleachedSilk = "rgba(255, 219, 205, 1)";
const persianOrange = "rgba(223, 141, 74, 1)";
const brownSugar = "rgba(184, 125, 102, 1)";
const sunGlow = "rgba(255, 203, 76, 1)";
const darkSkyBlue = "rgb(138, 193, 210)";
// const beauBlue = "rgb(144, 159, 179)";

// generators
const shadow = (px, rgb) => `0.3px ${px}px 0.2px 0px ${alpha(rgb, 0.9)}`


export let theme = createTheme ({
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
    darkSkyBlue: {
      main: darkSkyBlue
    }
  },
  generators: {
    shadow: shadow
  },
  // There are 24 elevations (shadow types) in MUI, however, from elevation 4,
  // we have to make all heights the same because of the type of shadow we use.
  //
  // @todo: work with a UI/UX designer to fix and introduce more depth
  shadows: [
    "none",
    shadow(1.5, brownSugar),
    shadow(3, brownSugar),
    shadow(4.5, brownSugar),
    shadow(6, brownSugar),
    shadow(6, brownSugar),
    shadow(6, brownSugar),
    shadow(6, brownSugar),
    shadow(6, brownSugar),
    shadow(6, brownSugar),
    shadow(6, brownSugar),
    shadow(6, brownSugar),
    shadow(6, brownSugar),
    shadow(6, brownSugar),
    shadow(6, brownSugar),
    shadow(6, brownSugar),
    shadow(6, brownSugar),
    shadow(6, brownSugar),
    shadow(6, brownSugar),
    shadow(6, brownSugar),
    shadow(6, brownSugar),
    shadow(6, brownSugar),
    shadow(6, brownSugar),
    shadow(6, brownSugar),
    shadow(6, brownSugar)
  ],
  shape: {
    borderRadius: 11,
  },
  typography: {
    fontFamily: "'Lexend', 'Helvetica', 'Arial', sans-serif",
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
  }
});

theme = createTheme(theme, {
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
          backgroundColor: darkSkyBlue
        }
      }
    },
    MuiCard: {
      variants: [
        {
          props: { fullHeight: true },
          style: {
            height: "100%"
          }
        }
      ]
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          [`&.${buttonClasses.focusVisible}, &:active, &:hover`]: {
            'boxShadow': theme.shadows[2]
          }
        }
      },
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
          height: 30,
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
