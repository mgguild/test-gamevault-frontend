import React from 'react'
import { RouteComponentProps } from 'react-router-dom'

const NftPage :React.FC<RouteComponentProps<{nftID: string}>> = ({
  match: {
    params: { nftID },
  },
}) => {
  console.log(nftID)
  return (
    <div>
      nft
    </div>
  )
}

export default NftPage;