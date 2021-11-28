import React from 'react'
import Skeleton from '@mui/material/Skeleton'
// utils
import { formatCurrency } from '../../utils/formatters'
import { useCHEFBalanceOf } from '../../hooks/useCHEFBalanceOf'

function CHEFBalance () {
  const balance = useCHEFBalanceOf()

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

export default CHEFBalance