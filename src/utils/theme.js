// material-ui
import {
  alpha,
  darken,
  lighten,
  createTheme,
  buttonClasses,
  stepLabelClasses,
} from "@mui/material";

// colors
// https://coolors.co/ffcc3b-283a8f-98c7e5-4bbd8c-fd2943-6d513f-3a2717
const sunGlow = "rgba(255, 204, 59, 1)"; // FFCC3B
const darkCornflowerBlue = "rgba(40, 58, 143, 1)"; // 283A8F
const paleCerulean = "rgba(152, 199, 229, 1)"; // 98C7E5
const oceanGreen = "rgba(76, 189, 140)"; // 4BBD8C
const redSalsa = "rgba(253, 42, 68, 1)"; // FD2943
const coffee = "rgba(109, 81, 63, 1)"; // 6D513F
const bistre = "rgba(58, 39, 23, 1)"; // 3A2717

// generators
const shadow = (px, color) => `0.3px ${px}px 0.4px 0px ${color}`;

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
      main: coffee,
      light: lighten(coffee, 0.3),
      dark: darken(coffee, 0.3),
      contrastText: "white",
    },
    success: {
      main: oceanGreen,
    },
    error: {
      main: redSalsa,
    },
    background: {
      default: paleCerulean,
    },

    // colors to deprecate
    sunGlow: {
      main: sunGlow,
      contrastText: "white",
    },
  },
  generators: {
    shadow: shadow,
  },
  // There are 24 elevations (shadow types) in MUI, however, from elevation 4,
  // we have to make all heights the same because of the type of shadow we use.
  //
  // @todo: work with a UI/UX designer to fix and introduce more depth
  blurredShadows: [
    "none",
    "inset 0px 3px 6px #00000012, 0px 3px 25px #00000029",
  ],
  shadows: [
    "none",
    shadow(1.5, bistre),
    shadow(3, bistre),
    shadow(4.5, bistre),
    shadow(6, bistre),
    shadow(6, bistre),
    shadow(6, bistre),
    shadow(6, bistre),
    shadow(6, bistre),
    shadow(6, bistre),
    shadow(6, bistre),
    shadow(6, bistre),
    shadow(6, bistre),
    shadow(6, bistre),
    shadow(6, bistre),
    shadow(6, bistre),
    shadow(6, bistre),
    shadow(6, bistre),
    shadow(6, bistre),
    shadow(6, bistre),
    shadow(6, bistre),
    shadow(6, bistre),
    shadow(6, bistre),
    shadow(6, bistre),
    shadow(6, bistre),
  ],
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: "'Rubik', 'Helvetica', 'Arial', sans-serif",
    h1: {
      fontSize: "3.052rem",
      fontWeight: 400,
      color: "white",
      WebkitTextStroke: "0.15rem black",
      textShadow: "0 4px 0 black",
      paddingTop: "8px",
      textTransform: "uppercase",
      fontFamily: "Luckiest Guy",
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
      fontWeight: 500,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 500,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 500,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  zIndex: {},
});

theme = createTheme(theme, {
  components: {
    MuiAppBar: {
      defaultProps: {
        color: "transparent",
      },
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
    MuiCardActions: {
      styleOverrides: {
        root: {
          padding: theme.spacing(2),
        },
      },
    },
    MuiAvatar: {
      variants: [
        {
          props: { variant: "inheritBorderRadius" },
          style: {
            borderRadius: theme.shape.borderRadius,
          },
        },
      ],
    },
    MuiIconButton: {
      variants: [
        {
          props: { shape: "inherit" },
          style: {
            borderRadius: theme.shape.borderRadius,
          },
        },
      ],
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          [`&.MuiButton-containedTertiary:not(.Mui-disabled):not(.MuiButton-active)`]:
            {
              backgroundColor: alpha(theme.palette.tertiary.main, 0.1),
              color: theme.palette.tertiary.main,
              boxShadow: "none",
            },
          [`&.MuiButton-containedTertiary.MuiButton-contained.Mui-disabled`]: {
            backgroundColor: alpha(theme.palette.tertiary.main, 0.04),
            color: alpha(theme.palette.tertiary.main, 0.5),
          },
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
          props: { shape: "squarish" },
          style: {
            borderRadius: 7.5,
          },
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
              boxShadow: theme.generators.shadow(
                2,
                theme.palette.tertiary.dark
              ),
            },
          },
        },
        {
          props: { alignedStartIcon: true },
          style: {
            [`.${buttonClasses.startIcon}`]: {
              position: "absolute",
              marginLeft: "0px",
              left: "8px",
            },
          },
        },
      ],
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          color: theme.palette.grey["300"],
        },
        text: {
          fill: theme.palette.secondary.main,
          fontWeight: 600,
          fontSize: "0.9rem",
        },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        label: {
          color: theme.palette.secondary.main,
          [`&.${stepLabelClasses.active}`]: {
            color: theme.palette.secondary.main,
          },
        },
      },
    },
  },
});
