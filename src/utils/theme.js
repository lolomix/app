// material-ui
import {
  alpha,
  darken,
  lighten,
  createTheme,
  buttonClasses,
  stepLabelClasses,
  listItemButtonClasses,
} from "@mui/material";
import YellowButtonBackground from "../assets/yellow-button-background.svg";

// colors
// https://coolors.co/ffcc3b-283a8f-98c7e5-4bbd8c-fd2943-6d513f-3a2717
const sunGlow = "rgba(255, 204, 59, 1)"; // FFCC3B
const darkCornflowerBlue = "rgba(40, 58, 143, 1)"; // 283A8F
const paleCerulean = "rgba(152, 199, 229, 1)"; // 98C7E5
//const oceanGreen = "rgba(76, 189, 140)"; // 4BBD8C
//const redSalsa = "rgba(253, 42, 68, 1)"; // FD2943
const coffee = "rgba(109, 81, 63, 1)"; // 6D513F
const bistre = "rgba(58, 39, 23, 1)"; // 3A2717
const lightGreen = "rgba(157,230,169, 1)"; // 9DE6A9
const redWarm = "rgba(241, 160, 170, 1)"; // F1A0AA
const paleYellow = "rgba(241,218,158, 1)"; // F1DA9E
const paleBlue = "rgba(156,188,238, 1)"; // 9CBCEE

// generators
const shadow = (px, color) => `0px ${px}px 0px 0px ${color}`;

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
      main: lightGreen,
    },
    error: {
      main: redWarm,
    },
    warning: {
      main: paleYellow,
    },
    info: {
      main: paleBlue,
    },
    background: {
      default: paleCerulean,
    },
    hover: {
      default: "#D4D4D4",
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
    shadow(3, bistre),
    shadow(3, bistre),
    shadow(3, bistre),
    shadow(3, bistre),
    shadow(3, bistre),
    shadow(3, bistre),
    shadow(3, bistre),
    shadow(3, bistre),
    shadow(3, bistre),
    shadow(3, bistre),
    shadow(3, bistre),
    shadow(3, bistre),
    shadow(3, bistre),
    shadow(3, bistre),
    shadow(3, bistre),
    shadow(3, bistre),
    shadow(3, bistre),
    shadow(3, bistre),
    shadow(3, bistre),
    shadow(3, bistre),
    shadow(3, bistre),
    shadow(3, bistre),
  ],
  shape: {
    borderRadius: 10,
  },
  zIndex: {},
  typography: {
    // Keep `fontFamily` here as it is used to generate the typography objects
    fontFamily: "'Rubik', 'Helvetica', 'Arial', sans-serif",
  },
});

// The following just overrides the properties of a generated theme from above
theme = createTheme(theme, {
  typography: {
    h1: {
      fontSize: "3.052rem",
      fontWeight: 400,
      color: theme.palette.common.white,
      WebkitTextStroke: `0.15rem ${theme.palette.common.black}`,
      textShadow: `0 4px 0 ${theme.palette.common.black}`,
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
      fontSize: "1rem",
      fontWeight: 600,
      color: theme.palette.text.secondary,
    },
    h6: {
      fontSize: "0.85rem",
      fontWeight: 600,
      color: theme.palette.text.disabled,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  snackbar: {
    WebkitTextFillColor: theme.palette.common.white,
    background: "#292C2D 0% 0% no-repeat padding-box !important",
    borderRadius: "10px !important",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background:
            "transparent radial-gradient(closest-side at 50% 50%, #C6E2F4 0%, #98C6E5 100%) 0% 0% no-repeat padding-box",
        },
      },
    },
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
    MuiDialogActions: {
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
        {
          props: { shape: "squarish" },
          style: {
            borderRadius: 5,
          },
        },
        {
          props: { size: "xsmall" },
          style: {
            padding: 0,
            fontSize: "0.9rem",
          },
        },
        {
          props: { variant: "contained" },
          style: {
            backgroundColor: theme.palette.grey[300],
            color: theme.palette.getContrastText(theme.palette.grey[300]),
          },
        },
        {
          props: { variant: "contained", color: "error" },
          style: {
            backgroundColor: theme.palette.error.main,
            color: theme.palette.error.contrastText,
            "&:hover": {
              backgroundColor: theme.palette.error.dark,
            },
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
          props: { size: "xsmall" },
          style: {
            padding: 0,
            fontSize: "0.9rem",
          },
        },
        {
          props: { size: "xlarge" },
          style: {
            padding: "14px 22px",
            fontSize: "1rem",
          },
        },
        {
          props: { size: "massive" },
          style: {
            fontSize: "1.3rem",
            lineHeight: "2",
          },
        },
        {
          props: { elongatedWidth: true },
          style: {
            paddingLeft: "30px",
            paddingRight: "30px",
          },
        },
        {
          props: { shape: "squarish" },
          style: {
            borderRadius: 7.5,
          },
        },
        {
          props: { shape: "roundish" },
          style: {
            borderRadius: 25,
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
        {
          props: { variant: "yellowContained" },
          style: {
            background: `transparent url(${YellowButtonBackground}) no-repeat center`,
            backgroundSize: "cover",
            borderBottom: "2.5px solid #3A2717",
            boxShadow: "none",
            borderRadius: "9px",
            "&:hover": {
              transform: "translateY(2px)",
              backgroundColor: theme.palette.hover.default,
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
    MuiChip: {
      variants: [
        {
          props: { shape: "squarish" },
          style: {
            borderRadius: 5,
          },
        },
      ],
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          // @todo seems like there is a bug as ListItemButton does not support `selected` slot
          [`&.${listItemButtonClasses.selected}`]: {
            backgroundColor: alpha(
              theme.palette.primary.main,
              theme.palette.action.selectedOpacity +
                theme.palette.action.focusOpacity
            ),
            [`&.${listItemButtonClasses.focusVisible}`]: {
              backgroundColor: alpha(
                theme.palette.primary.main,
                theme.palette.action.selectedOpacity +
                  theme.palette.action.focusOpacity
              ),
            },
          },
          [`&.${listItemButtonClasses.selected}:hover`]: {
            backgroundColor: alpha(
              theme.palette.primary.main,
              theme.palette.action.selectedOpacity +
                theme.palette.action.hoverOpacity
            ),
            // Reset on touch devices, it doesn't add specificity
            "@media (hover: none)": {
              backgroundColor: alpha(
                theme.palette.primary.main,
                theme.palette.action.selectedOpacity
              ),
            },
          },
        },
      },
    },
  },
});
