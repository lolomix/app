import React from "react";
//material-ui
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";

export default function ToastLoading(props) {
  const [progress, setProgress] = React.useState(100);
  React.useEffect(() => {
    setProgress(100);
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress <= 0 ? 0 : prevProgress - 2));
    }, 100);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="toastSpinnerWrapper">
      <IconButton
        size="small"
        color="secondary"
        onClick={() => {
          props.closeSnackbar(props.snackKey);
        }}
      >
        <Close />
      </IconButton>
      <CircularProgress variant="determinate" value={progress} color="secondary" size={36} thickness={2} className="toastSpinner" />
    </div>
  );
}
