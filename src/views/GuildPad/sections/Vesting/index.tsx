import React from 'react';
import { Heading } from '@metagg/mgg-uikit'
import PageSection from '../Layout';
import { BgContainer } from '../Home/styled';
import { BoxContainer, BoxHeader } from '../styled';
import Card from './components/Card';


const Details = {
  name: 'MGG',
  description: 'Sample',
  socials: {
    facebook: 'facebook',
    twitter: 'twitter'
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
          <Card details={Details}/>
        </BoxContainer>
      </BgContainer>
    </PageSection>
  )
}

export default VestingSection