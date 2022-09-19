import React from 'react';
import { Heading } from '@metagg/mgg-uikit'
import tokens from 'config/constants/tokens'
import PageSection from '../Layout';
import { BgContainer } from '../Home/styled';
import { BoxContainer, BoxHeader } from '../styled';
import Post from './components/Post';


const Details = {
  name: 'MGG',
  description: 'MetaGaming Guild is a unified DAO-based ecosystem of Gaming Guild, INO/IGO Launchpad, GameFi Vaults, Game Yield Farming and Play-to-Earn Game aimed at democratizing game finance. MetaGaming Guild envisions to become the primary and most community-centric DAO in the GameFi metaverse!',
  token: tokens.mgg,
  socials: {
    facebook: 'https://www.facebook.com/MetaGamingGuild/',
    twitter: 'https://twitter.com/MetaGamingGuild',
    telegram: 'https://t.me/MetaGamingGuild',
    discord: 'https://discord.com/invite/5a7Ca7JFD2'
  }
  
}

const VestingSection: React.FC = () => {
  return (
    <PageSection direction="column">
      <BgContainer>
        <BoxHeader>
          <Heading size='l'>MGG Private Sale Vesting</Heading>
        </BoxHeader>
        <BoxContainer>
          <Post details={Details}/>
        </BoxContainer>
      </BgContainer>
    </PageSection>
  )
}

export default VestingSection