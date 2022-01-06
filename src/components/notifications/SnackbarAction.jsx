import React from 'react'
import { CircularProgress, IconButton } from '@mui/material'
import IndeterminateCircularProgress from './IndeterminateCircularProgress'
import { Close } from '@mui/icons-material'
import { useSnackbar } from 'notistack'

/**
 * @param key
 * @param duration
 * @returns {JSX.Element}
 * @constructor
 */
function SnackbarAction ({ key, duration = null }) {
  const { closeSnackbar } = useSnackbar()
  const Progress = (duration) ? IndeterminateCircularProgress : CircularProgress;

  /**
   * Handle closing of the snackbar
   *
   * @param key
   * @returns {(function(): void)|*}
   */
  const onClickClose = key => () => {
    closeSnackbar(key)
  }

  return <IconButton
    size="small"
    color="inherit"
    onClick={onClickClose(key)}
  >
    <Close/>
    <Progress
      duration={duration}
      variant={duration ? "determinate" : "indeterminate"}
      color="inherit"
      size={36}
      thickness={2}
      sx={{
        position: 'absolute',
      }}
    />
  </IconButton>

}

export default SnackbarAction