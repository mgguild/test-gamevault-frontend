import React from 'react'
import { PadTitles, PostContainer, PostHeader } from 'components/Launchpad/styled'
import { Token } from 'config/constants/types'
import styled from 'styled-components'
import useMedia from 'use-media'
import TokenLogo from 'components/Launchpad/Logo'

interface Socials {
  [key: string]: string
}

interface Props {
  name: string
  token: Token
  description: string
  socials: Socials
}

const Card: React.FC<{ details: Props }> = ({ details }) => {
  const { name, description, socials, token } = details
  const isMobile = useMedia({ maxWidth: 600 })
  return (
    <PostContainer style={{ position: 'relative', overflow: 'hidden' }}>
      <PostHeader fullBorder>
        <Container>
          <PadTitles
            alignItems="center"
            style={isMobile ? { flexDirection: 'column', rowGap: '1.5px' } : { flexDirection: 'row' }}
          >
            <TokenLogo tokenName="MGG" nameSize="xl" primaryToken={token} padding="0px" socMeds={socials} socMedsSize={22} color="white" />
          </PadTitles>
        </Container>
      </PostHeader>
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
