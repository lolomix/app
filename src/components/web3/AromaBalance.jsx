import React from 'react'
// custom
import { formatCurrency } from '../../utils/formatters'
import { useAROMABalanceOf } from '../../hooks/useAROMABalanceOf'
// material-ui
import Skeleton from '@mui/material/Skeleton'
import { useEthers } from '@usedapp/core'

function AromaBalance () {
  const { account } = useEthers()
  const [balance, balanceFormatted] = useAROMABalanceOf(account)

  return balance === undefined ? (
    <Skeleton variant="text"/>
  ) : (
    <span>{formatCurrency(balanceFormatted)}</span>
  )
}

export default AromaBalance