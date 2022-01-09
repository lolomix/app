// material-ui
import {
  alpha,
  darken,
  lighten,
  createTheme,
  buttonClasses,
} from '@mui/material'

// colors
// https://coolors.co/ffcc3b-283a8f-98c7e5-4bbd8c-fd294
const sunGlow = "rgba(255, 204, 59, 1)"; // FFCC3B
const darkCornflowerBlue = "rgba(40, 58, 143, 1)"; // 283A8F
const paleCerulean = "rgba(152, 199, 229, 1)"; // 98C7E5
const oceanGreen = "rgba(76, 189, 140)"; // 4BBD8C
const redSalsa = "rgba(253, 42, 68, 1)"; // FD2943

// colors to deprecate (old)
const cafeNoir = "rgba(39, 12, 10, 1)";
const brownSugar = "rgba(184, 125, 102, 1)";
const culturedWhite = "rgba(250, 250, 250, 1)";

// generators
const shadow = (px, rgb) => `0.3px ${px}px 0.4px 0px ${alpha(rgb, 0.9)}`;

export let theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: sunGlow,
    },
    secondary: {
      main: darkCornflowerBlue,
    },
    tertiary: {
      main: culturedWhite,
      light: lighten(culturedWhite, 0.3),
      dark: darken(culturedWhite, 0.3),
      contrastText: cafeNoir,
    },
    success: {
      main: oceanGreen
    },
    error: {
      main: redSalsa
    },
    // colors to deprecate
    sunGlow: {
      main: sunGlow,
      contrastText: "white",
    },
    cafeNoir: {
      main: cafeNoir,
    }
  },
  generators: {
    shadow: shadow,
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
    borderRadius: 10,
  },
  typography: {
    fontFamily: "'Balsamiq Sans', 'Helvetica', 'Arial', sans-serif",
    h1: {
      fontSize: "3.052rem",
      fontWeight: 400,
    },
    h2: {
      fontSize: "2.441rem",
      fontWeight: 400,
    },
    h3: {
      fontSize: "1.953rem",
      fontWeight: 400,
    },
    h4: {
      fontSize: "1.563rem",
      fontWeight: 400,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 400,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 400,
    },
    button: {
      textTransform: "none"
    }
  },
  zIndex: {},
});

theme = createTheme(theme, {
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: paleCerulean,
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        color: "cafeNoir",
      },
    },
    MuiToolbar: {
      variants: [
        {
          props: { variant: "large" },
          style: {
            minHeight: "88px",
          },
        },
      ],
    },
    MuiAccordion: {
      defaultProps: {
        square: true,
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
        },
      },
    },
    MuiCard: {
      variants: [
        {
          props: { fullheight: "true" },
          style: {
            height: "100%",
          },
        },
      ],
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          [`&.MuiButton-containedTertiary:not(.Mui-disabled):not(.MuiButton-active)`]: {
            backgroundColor: alpha(theme.palette.tertiary.main, 0.1),
            color: theme.palette.tertiary.main,
            boxShadow: "none"
          },
          [`&.MuiButton-containedTertiary.MuiButton-contained.Mui-disabled`]: {
            backgroundColor: alpha(theme.palette.tertiary.main, 0.04),
            color: alpha(theme.palette.tertiary.main, 0.5)
          }
        },
      },
      variants: [
        {
          props: { size: "xlarge" },
          style: {
            padding: "14px 22px",
            fontSize: "1rem",
          },
        },
        {
          props: { elongatedwidth: "true" },
          style: {
            paddingLeft: "32px",
            paddingRight: "32px",
          },
        },
        {
          props: { color: "secondary", variant: "contained", disabled: true },
          style: {
            backgroundColor: "white"
          }
        },
        {
          props: { color: "primary", variant: "contained" },
          style: {
            boxShadow: theme.generators.shadow(2, theme.palette.primary.dark),
            [`&.${buttonClasses.focusVisible}, &:active, &:hover`]: {
              boxShadow: theme.generators.shadow(2, theme.palette.primary.dark),
            },
          },
        },
        {
          props: { color: "tertiary", variant: "contained" },
          style: {
            boxShadow: theme.generators.shadow(2, theme.palette.tertiary.dark),
            [`&.${buttonClasses.focusVisible}, &:active, &:hover`]: {
              boxShadow: theme.generators.shadow(2, theme.palette.tertiary.dark),
            },
          },
        },
        {
          props: { alignedStartIcon: true },
          style: {
            [`.${buttonClasses.startIcon}`]: {
              position: "absolute",
              marginLeft: "0px",
              left: "8px"
            }
          },
        },
      ],
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: 30,
          borderRadius: 11,
          border: "5px solid lightgray",
        },
        barColorPrimary: {
          backgroundColor: sunGlow,
        },
        colorPrimary: {
          backgroundColor: "lightgray",
        },
      },
    },
  }
});
