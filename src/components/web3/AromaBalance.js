import React from 'react'
import Skeleton from '@mui/material/Skeleton'
// utils
import { formatCurrency } from '../../utils/formatters'
import { useAROMABalanceOf } from '../../hooks/useAROMABalanceOf'

function AromaBalance () {
  const balance = useAROMABalanceOf()

  return (
    <>
      {balance === undefined ? (
          <Skeleton variant="text"/>
        ) : (
          <span>{formatCurrency(balance)}</span>
        )
      }
    </>
  )
}

export default AromaBalance