import React, { useState, useEffect } from "react";
import { withTranslation } from "react-i18next";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";

function IconButtonCopy ({ t, copyText, size, fontSize }) {

  /**
   * Handles the copy to clipboard using Clipboard API OR regular method
   *
   * @todo refactor this to a global helper
   */
  const handleAccountCopyToClipboardIconClick = () => {
    if (!success) {
      setSuccess(true)
    }
    // navigator clipboard api needs a secure context (https)
    if (navigator.clipboard && navigator.permissions) {
      navigator.clipboard.writeText(copyText)
    } else if (document.queryCommandSupported('copy')) {
      const ele = document.createElement('textarea')
      ele.value = copyText
      document.body.appendChild(ele)
      ele.select()
      document.execCommand('copy')
      document.body.removeChild(ele)
    }
  }

  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false)
      }, 1000)
    }
  }, [success])

  return (
    <Tooltip title={success ? 'copied' : t('base.copyToClipboard')}>
      <IconButton
        component="a"
        size={size}
        onClick={handleAccountCopyToClipboardIconClick}
        edge="end"
        aria-label="Copy account address"
      >
        {success ? <CheckIcon sx={{ fontSize: fontSize }}/> : <ContentCopyIcon sx={{ fontSize: fontSize }}/>}
      </IconButton>
    </Tooltip>
  )
}

export default withTranslation()(IconButtonCopy);
