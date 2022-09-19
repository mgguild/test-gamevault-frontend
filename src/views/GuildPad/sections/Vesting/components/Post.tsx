import React, { useState } from 'react'
import { Details, PadActions, PadTitles, PostContainer, PostHeader } from 'components/Launchpad/styled'
import { Token, Socials} from 'config/constants/types'
import styled from 'styled-components'
import useMedia from 'use-media'
import TokenLogo from 'components/Launchpad/Logo'
import { Text } from '@metagg/mgg-uikit'
import { ChevronDown, ChevronUp } from 'react-feather'
import Content from './Content'

interface Props {
  name: string
  token: Token
  description: string
  socials: Socials
}

const Card: React.FC<{ details: Props }> = ({ details }) => {
  const [ toggle, setToggle ] = useState<boolean>(false)
  const { name, description, socials, token } = details
  const isMobile = useMedia({ maxWidth: 600 })
  return (
    <PostContainer style={{ position: 'relative', overflow: 'hidden' }} fullBorder>
      <PostHeader>
        <Container>
          <PadTitles
            alignItems="center"
            style={isMobile ? { flexDirection: 'column', rowGap: '1.5px' } : { flexDirection: 'row' }}
          >
            <TokenLogo tokenName="MGG" nameSize="xl" primaryToken={token} padding="0px" socMeds={socials} socMedsSize={22} color="white" />
          </PadTitles>
          <PadActions>
            { !isMobile && (
               <Details onClick={() => setToggle(!toggle)}>
               <Text bold>
                 Details
               </Text>
               &nbsp;
               <Text style={{ display: 'flex', alignItems: 'center' }}>
                 { toggle? <ChevronUp /> : <ChevronDown /> }
               </Text>
             </Details>
            )
          }
          </PadActions>
        </Container>
        {
          isMobile && (
            <DetailsM onClick={() => setToggle(!toggle)}>
              <Text bold>Details</Text> &nbsp;
            <Text style={{ display: 'flex', alignItems: 'center' }}>{toggle ? <ChevronUp /> : <ChevronDown />}</Text>
            </DetailsM>
          )
        }
      </PostHeader>
      { toggle && <Content details={{description}}/> }
    </PostContainer>
  )
}

export default Card

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 425px) {
    flex-direction: column;
  }

  @media screen and (max-width: 600px) {
    margin: 0 0 2rem 0;
  }
`

const DetailsM = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  padding: 0.5rem;
  left: 0;
  bottom: 0;
  width: 100%;
  background: ${({ theme }) => theme.colors.MGG_mainBG};
`

