import { Flex, Heading, IconButton, Text } from '@metagg/mgg-uikit'
import CopyToClipboard from 'views/Gamefi/components/CopyToClipboard'
import { Grid } from '@mui/material'
import UnlockButton from 'components/UnlockButton'
import { useWeb3React } from '@web3-react/core'
import Placeholder from 'assets/marketplace/1.png'
import useTheme from 'hooks/useTheme'
import React, {ChangeEvent, useState } from 'react'
import { Copy, RotateCw } from 'react-feather'
import styled from 'styled-components'
import { shortenAddress } from 'utils/addressHelpers'
import SearchField from '../components/Input/SearchField'
import { BgPage, Section } from '../styled'
import { UserContainer, UserImg, CollectionsContainer } from './styled'
import SelectComponent from '../components/Select'
import 'style/marketplace/_stylesheet.scss'

const UserProfile: React.FC = () => {
  const { theme } = useTheme()
  const { account } = useWeb3React()
  const [ query, setQuery ] = useState('')
  const handleSearch = (e:ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }

  const src = Placeholder
  const userAddress = account ? (
    <>
      <Text color="textSubtle">{shortenAddress(account, 4)}</Text>
      <CopyToClipboard toCopy={account} color={theme.colors.MGG_accent2} />
    </>
  ) : (
    <UnlockButton variant="text" />
  )

  return (
    <Section padding="0" bgColor={theme.isDark ? '#140937' : theme.colors.MGG_container}>
      <BgPage>
        <div className="page-body">
          <Container>
            <UserContainer>
              <Grid container columnSpacing={{ md: 2 }} className='user-details'>
                <Grid item xs={5} md={1}>
                  <UserImg alt="user-icn" src={src} />
                </Grid>
                <Grid item xs={12} md={5}>
                  <Flex
                    flexDirection="column"
                    alignItems="flex-start"
                    justifyContent="center"
                    style={{ height: '100%' }}
                  >
                    <Heading size="xl">Namey name</Heading>
                    <Flex alignItems="center">{userAddress}</Flex>
                  </Flex>
                </Grid>
              </Grid>
              <Flex className='filter-menu' marginTop="2rem" flexWrap='wrap'>
                <Flex alignItems="center">
                  <Text fontSize="1.5rem">Sort By</Text>
                  <SelectComponent />
                </Flex>
                <Flex alignItems='center'><SearchField handleChange={handleSearch} placeHolder='Search' /></Flex>
              </Flex>
            </UserContainer>
            <hr className="hr" color="#0f3960" />
            <CollectionsContainer>test</CollectionsContainer>
          </Container>
        </div>
      </BgPage>
    </Section>
  )
}

export default UserProfile

const Container = styled(Flex)`
  flex-direction: column;
`
