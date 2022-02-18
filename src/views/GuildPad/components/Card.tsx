import React from 'react'
import Card from 'components/Launchpad/Cards'
import { GuildpadConfig } from 'config/constants/types';


const GCard:React.FC<{guildpad: GuildpadConfig}> = ({guildpad}) => {
    return <Card guildpad={guildpad}  />
}

export default GCard;
