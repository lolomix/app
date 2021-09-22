import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar, SnackbarContent } from "notistack";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up("sm")]: {
      minWidth: "344px !important",
    },
  },
  card: {
    backgroundColor: "#fddc6c",
    width: "100%",
  },
  typography: {
    fontWeight: "bold",
  },
  actionRoot: {
    padding: "8px 8px 8px 16px",
  },
  icons: {
    marginLeft: "auto",
  },
  expand: {
    padding: "8px 8px",
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  collapse: {
    padding: 16,
  },
  checkIcon: {
    fontSize: 20,
    color: "#b3b3b3",
    paddingRight: 4,
  },
  button: {
    padding: 0,
    textTransform: "none",
  },
}));

const SnackMessage = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const { closeSnackbar } = useSnackbar();

  const handleDismiss = () => {
    closeSnackbar(props.id);
  };

  return (
    <SnackbarContent ref={ref} className={classes.root}>
      <Alert variant="filled" severity="error">
        {props.message}
      </Alert>

      <Typography variant="subtitle2" className={classes.typography}></Typography>

      <IconButton className={classes.expand} onClick={handleDismiss}>
        <CloseIcon />
      </IconButton>
    </SnackbarContent>
  );
});

export default SnackMessage;
