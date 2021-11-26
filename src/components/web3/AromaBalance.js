import React from 'react'
import Skeleton from '@mui/material/Skeleton'
// utils
import { formatCurrency } from '../../utils/formatters'
import { useAROMABalanceOf } from '../../hooks/useAROMABalanceOf'

const AromaBalance = function () {
  const balance = useAROMABalanceOf()

  return balance === undefined ? <Skeleton variant="text"/> : <>{formatCurrency(balance)}</>
}

export default AromaBalance
