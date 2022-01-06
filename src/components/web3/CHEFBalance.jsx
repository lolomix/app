import React from 'react'
// utils
import { formatCurrency } from '../../utils/formatters'
import { useCHEFBalanceOf } from '../../hooks/useCHEFBalanceOf'
import { useEthers } from '@usedapp/core'
// material-ui
import Skeleton from '@mui/material/Skeleton'

function CHEFBalance () {
  const { account } = useEthers()
  const [balance, balanceFormatted] = useCHEFBalanceOf(account)

  return balance === undefined ? (
    <Skeleton variant="text"/>
  ) : (
    <span>{formatCurrency(balanceFormatted)}</span>
  )
}

export default CHEFBalance