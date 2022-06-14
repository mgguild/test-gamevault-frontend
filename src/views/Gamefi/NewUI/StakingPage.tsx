import React, { useCallback, useContext, useEffect, useMemo, useRef, useState, lazy } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import RenderFarm from './sections/FarmsSection'
import RenderPool from './sections/PoolSection'

const ComingSoon = lazy(() => import('views/ComingSoon'))

const FarmPage: React.FC<RouteComponentProps<{ type: string; farmID: string }>> = ({
  match: {
    params: { type, farmID },
  },
}) => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Deposit/Withdrawals',
        accessor: 'depWith', // accessor is the "key" in the data
      },
      {
        Header: 'Tokens Staked',
        accessor: 'tokensStaked',
      },
      {
        Header: 'Earnings',
        accessor: 'earnings',
      },
      {
        Header: 'Wallet Address',
        accessor: 'txn',
      },
      {
        Header: 'Time',
        accessor: 'time',
      },
    ],
    [],
  )

  return type === 'LP' ? (
    <ComingSoon title="GameFi | Farms" />
  ) : (
    // <RenderFarm farmID={farmID} stakingType={type} tblColumns={columns} />
    <RenderPool farmID={farmID} tblColumns={columns} />
  )
}

export default FarmPage
