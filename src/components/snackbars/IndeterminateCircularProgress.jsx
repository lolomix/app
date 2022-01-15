import React, { useEffect } from "react";
// material-ui
import CircularProgress from "@mui/material/CircularProgress";

function IndeterminateCircularProgress(props) {
  const { duration, ...rest } = props;

  /**
   * @type {number}
   */
  const initialProgress = 100;

  /**
   * Delay in between intervals (executions of the specified function)
   *
   * @type {number}
   */
  const timeout = 100;

  /**
   * The number to reduce the progress between intervals.
   *
   * @type {number}
   */
  const step = initialProgress / (duration / timeout);

  const [progress, setProgress] = React.useState(initialProgress);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((progress) => (progress <= 0 ? 0 : progress - step));
    }, timeout);

    return () => clearInterval(interval);
  }, [step]);

  return <CircularProgress value={progress} {...rest} />;
}

export default IndeterminateCircularProgress;
