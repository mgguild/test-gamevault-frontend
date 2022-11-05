import React, { useMemo } from 'react'
import styled from 'styled-components'
import { RouteComponentProps } from 'react-router-dom'
import { SocialIcon } from 'react-social-icons'
import { ExternalLink } from 'react-feather'
import { BsFillRecordFill, BsShieldFillCheck } from 'react-icons/bs'
import { Flex, Heading, Text, Button, useModal } from '@metagg/mgg-uikit'
import { Grid } from '@mui/material'
import { NftCat } from 'config/constants/Marketplace/types'
import useTheme from 'hooks/useTheme'
import SvgIcon from 'components/SvgIcon'
import fetchNftImage from 'utils/fetchNftImage'
import { BuyModal } from '../Modals'
import Table from '../Table'
import { BgPage, Section } from '../../styled'
import { Wrapper, ImageContainer } from './styled'

const NftPage: React.FC<RouteComponentProps<{ nftID: string }>> = ({
  match: {
    params: { nftID },
  },
}) => {
  const { theme } = useTheme()
  const src = useMemo(() => fetchNftImage.Vicar, [])

  const data = [
    {
      event: 'Transfer',
      price: '12.50',
      from: '0x63a...e082',
      to: ' ',
      date: '9/12/2022 03:33PM',
    },
  ]
  
  const columns = React.useMemo(() => {
      return [
          {
            Header: 'EVENT',
            accessor: 'event',
          },
          {
            Header: 'PRICE',
            accessor: 'price',
          },
          {
            Header: 'FROM',
            accessor: 'from',
          },
          {
            Header: 'TO',
            accessor: 'to',
          },
          {
            Header: 'DATE',
            accessor: 'date'
          }
      ]
  }, [])

  const [onBuyNft] = useModal(
    <BuyModal />
  )
  return (
    <Section padding="0" bgColor={theme.isDark ? '#140937' : theme.colors.MGG_container}>
      <BgPage>
        <Flex flexDirection="column" style={{ margin: `2rem 0`, position: 'relative', zIndex: 2, minHeight: '100vh' }}>
          <Wrapper>
            <Grid container padding="10px" columnSpacing={{ sm: 5, md: 5 }} justifyContent='center'>
              <Grid item xs={12} md={5} lg={4} sx={{marginBottom: '2rem'}}>
                <ImageContainer>
                  <Flex flex={1} justifyContent="flex-end">
                    <BsFillRecordFill fill={NftCat.iggod} fontSize={40} />
                  </Flex>
                  <SvgIcon Img={src} width={450} />
                </ImageContainer>
              </Grid>
              <Grid item xs={12} md={6} lg={5}>
                <DetailsDiv flexDirection="column" alignItems="flex-start">
                  <Flex alignItems="center">
                    <Heading color={theme.colors.primary}>
                      Lorem Ipsum &nbsp; <BsShieldFillCheck color={theme.colors.primary} />
                    </Heading>
                  </Flex>
                  <Heading size="xl">Lorem Ipsum</Heading>
                  <Text color="textSubtle" fontSize="1em">
                    Minted 1 month ago, on Tue Jul 26 2022
                  </Text>
                  <Flex alignItems="center">
                    <BsFillRecordFill color={theme.colors.primary} fontSize={20} />
                    <Text color="textSubtle" fontSize='1.5em'>
                      {' '}
                      &nbsp; Owned by <span style={{ color: theme.colors.MGG_accent2 }}>0x63...e082</span>
                    </Text>
                  </Flex>
                  <Flex style={{ marginTop: '1rem' }}>
                    <SocialIcon url="https://twitter.com/" bgColor={theme.colors.MGG_accent2} target="_blank" />
                  </Flex>
                </DetailsDiv>
                <PriceDiv>
                  <Flex alignItems="center">
                    <Text color="textSubtle" marginRight="1rem" fontSize='1.5em'>
                      Listed price
                    </Text>
                    <Flex alignItems="center">
                      <BsFillRecordFill fill={NftCat.iggod} />
                      <Text bold fontSize='1.5em'> 12.34</Text>
                    </Flex>
                  </Flex>
                  <Flex alignItems="center">
                    <Text color="textSubtle" marginRight="1rem" fontSize='1.5em'>
                      Listed price
                    </Text>
                    <Flex alignItems="center">
                      <BsFillRecordFill fill={NftCat.iggod} />
                      <Text bold fontSize='1.5em'> 12.34</Text>
                    </Flex>
                  </Flex>
                </PriceDiv>
                <ActionDiv>
                  <Flex marginBottom='1rem'>
                    <Text color="textSubtle" fontSize='1.5em'>
                      View on Lorem Ipsum &nbsp;
                    </Text>
                    <ExternalLink color={theme.colors.MGG_accent2} />
                  </Flex>
                  <BtnGroup>
                    <Button className='btn btn-buy' onClick={onBuyNft}>
                      BUY NOW
                    </Button>
                    <Button className='btn btn-place'>
                      PLACE OFFER                    
                    </Button>
                    <Button className='btn btn-swap'>
                      PROPOSE SWAP
                    </Button>
                  </BtnGroup>
                </ActionDiv>
              </Grid>
            </Grid>
          </Wrapper>
          <Wrapper>
            <Grid container justifyContent='center'>
                <Grid item xs={12} md={11} lg={9} justifyContent='flex-start'>
                  <Heading size="xl" color={theme.colors.primary} style={{textAlign: 'left'}}>History</Heading>
                  <div style={{marginTop: '2rem'}}>
                  <Table columns={columns} data={data} />
                  </div>
                </Grid>
            </Grid>
          </Wrapper>
        </Flex>
      </BgPage>
    </Section>
  )
}

export default NftPage

const DetailsDiv = styled(Flex)`
  & > * {
    margin: 0.2rem 0;
  }
`

const StyledDiv = styled(Flex)`
  margin-top: 1rem;
  flex-direction: column;
  align-items: flex-start;
`

const PriceDiv = styled(StyledDiv)``
const ActionDiv = styled(StyledDiv)``
const BtnGroup = styled(Flex)`
  justify-content: space-evenly;
  align-items: center;
  // flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
   & > * {
      border-radius: 50px;
      margin-top: 10px;
   }
   .btn {
    color: black;
   }
   .btn-buy {
    background-color: #00f4fd;
   }
   .btn-swap {
    background-color: #cc00fd;
   }
   .btn:hover {
    background-color: #fff!important;
  }

`
