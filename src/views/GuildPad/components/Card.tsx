import React from 'react'
import Card from 'components/Launchpad/Cards'
import { IGuildpad } from 'config/constants/types';


const GCard:React.FC<{guildpad: IGuildpad}> = ({guildpad}) => {
    return <Card guildpad={guildpad} />
}

export default GCard;