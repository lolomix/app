// material-ui
import {
  alpha,
  darken,
  lighten,
  createTheme,
  buttonClasses,
} from '@mui/material'

import rootBgPattern from "../assets/background/outer-bg-pattern-opacity30.png";

// colors
const cafeNoir = "rgba(39, 12, 10, 1)";
const ming = "rgba(29, 96, 104, 1)"
const brownSugar = "rgba(184, 125, 102, 1)";
const sunGlow = "rgba(255, 203, 76, 1)";
const darkSkyBlue = "rgb(138, 193, 210)";
const culturedWhite = "rgba(250, 250, 250, 1)";

// generators
const shadow = (px, rgb) => `0.3px ${px}px 0.4px 0px ${alpha(rgb, 0.9)}`;

export let theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: ming,
    },
    secondary: {
      main: cafeNoir,
    },
    tertiary: {
      main: culturedWhite,
      light: lighten(culturedWhite, 0.3),
      dark: darken(culturedWhite, 0.3),
      contrastText: cafeNoir,
    },
    sunGlow: {
      main: sunGlow,
      contrastText: "white",
    },
    cafeNoir: {
      main: cafeNoir,
    },
    darkSkyBlue: {
      main: darkSkyBlue,
    },
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
          background: "#fff",
          backgroundImage: `url("${rootBgPattern}")`,
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
