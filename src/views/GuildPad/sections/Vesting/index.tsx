import React from 'react';
import { Heading } from '@metagg/mgg-uikit'
import tokens from 'config/constants/tokens'
import PageSection from '../Layout';
import { BgContainer } from '../Home/styled';
import { BoxContainer, BoxHeader } from '../styled';
import Post from './components/Post';


const Details = {
  name: 'MGG',
  description: 'Sample',
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