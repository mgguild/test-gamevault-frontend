import { Modal, Heading, Flex, IconButton, Text, Button } from '@metagg/mgg-uikit'
import styled from 'styled-components'
import React from 'react'
import { X } from 'react-feather'
import { Grid } from '@mui/material'
import { BsRecordFill, BsShieldFillCheck } from 'react-icons/bs'
import useTheme from 'hooks/useTheme'
import { NftCat, NftConfig } from 'config/constants/Marketplace/types'
import fetchNftImage from 'utils/fetchNftImage'
import './styles.css'

interface Props {
  onDismiss?: () => void
}

const BuyModal = ({ onDismiss }: Props) => {
  const { theme } = useTheme()

  const src = fetchNftImage.Vicar

  return (
    <Modal title="" onDismiss={onDismiss} hideCloseButton>
      <div className="modal-body">
        <Flex justifyContent="space-between" alignItems="center">
          <Heading size="lg" color={theme.colors.MGG_accent2}>
            Buy Now
          </Heading>
          <IconButton variant="secondary" style={{ border: 'none' }} onClick={onDismiss}>
            <X color={theme.colors.MGG_accent2} />
          </IconButton>
        </Flex>
        <div>
          <Text color="textSubtle">Here&apos;s a summary of your purchase</Text>
        </div>
        <Grid container marginTop="2rem" columnSpacing={{ xs: 1 }} alignItems="center">
          <Grid item xs={4} sm={3} md={4}>
            <img src={src} alt="nft-iamge" width="100px" />
          </Grid>
          <Grid item xs={4} sm={5} md={5}>
            <ItemsContainer flexDirection="column" className="modal-nft-desc">
              <Text color={theme.colors.primary} fontSize="1em">
                Lorem Ipsum <BsShieldFillCheck />{' '}
              </Text>
              <Text color={theme.colors.MGG_accent2} fontSize="1.2em">
                0x63a...e082
              </Text>
              <Text fontSize="1.5em">Lorem Ipsum</Text>
            </ItemsContainer>
          </Grid>
          <Grid item xs={3} sm={4} md={3}>
            <ItemsContainer alignItems="center" color="">
              <BsRecordFill fontSize="2em" color={NftCat.iggod} />
              <Text fontSize="2em">12.34</Text>
            </ItemsContainer>
          </Grid>
        </Grid>
        <hr color="#776118" />
        <ItemsContainer justifyContent="space-between">
          <Text fontSize="2em">Total</Text>
          <Flex alignItems="center">
            <BsRecordFill fontSize="2em" color={NftCat.iggod} />
            <Text fontSize="2em">12.34</Text>
          </Flex>
        </ItemsContainer>
        <ItemsContainer justifyContent="center" marginTop="3em" flexDirection="column" alignItems="center">
          <Flex alignItems="center">
            <input type="checkbox" />
            <Text>&nbsp;I approve MGG Terms & Conditions</Text>
          </Flex>
          <Button marginTop="2em" className="btn-checkout">
            CHECKOUT
          </Button>
        </ItemsContainer>
      </div>
    </Modal>
  )
}

export default BuyModal

BuyModal.defaultProps = {
  onDismiss: () => null,
}

const ItemsContainer = styled(Flex)`
  font-size: 10px;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 17px;
  }
`
