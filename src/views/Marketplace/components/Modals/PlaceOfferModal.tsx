import { Flex, Heading, IconButton, Modal, Text, Button } from '@metagg/mgg-uikit'
import styled from 'styled-components'
import useTheme from 'hooks/useTheme'
import { Grid } from '@mui/material'
import React from 'react'
import { X } from 'react-feather'
import './styles.css'

interface Props {
  onDismiss?: () => void
}

const PlaceOfferModal = ({ onDismiss }: Props) => {
  const { theme } = useTheme()
  return (
    <Modal title="" onDismiss={onDismiss} hideCloseButton>
      <div className="modal-body">
        <Flex alignItems="center" justifyContent="space-between">
          <Heading size="lg" color={theme.colors.MGG_accent2}>
            Place an offer
          </Heading>
          <IconButton variant="secondary" style={{ border: 'none' }} onClick={onDismiss}>
            <X color={theme.colors.MGG_accent2} />
          </IconButton>
        </Flex>
        <ModalSection>
          <Flex flexDirection="column" style={{ width: '100%' }}>
            <Heading size="lg">Price</Heading>
            <input className="input-price" />
          </Flex>
          <Flex flexDirection="column" style={{ width: '100%' }}>
            <Heading size="lg">Offer Details</Heading>
            <Text color="textSubtle"  marginTop='0.5rem'>
              All transactions are placed in Lotrem, MGG automatically convert your Ipsum to Lorem. Please review the
              conversion summary below.
            </Text>
          </Flex>
          <Grid container justifyContent="space-between">
            <Grid item md={5}>
              <Text color='textSubtle'>Ipsum Balance</Text>
              <Text color='textSubtle'>Lorem Balance</Text>
              <Flex>
                <Text color='textSubtle'>Convert&nbsp;</Text>
                <Flex alignItems="center">
                  <Text color='textSubtle' fontSize='0.8em'>Max &nbsp;</Text>
                  <input type="checkbox" />
                </Flex>
              </Flex>
            </Grid>
            <Grid item md={5} sx={{textAlign: 'right'}}>
              <Text >0.123 Ipsum</Text>
              <Text >0.123 Lorem</Text>
              <Text >0.123 Ipsum</Text>
            </Grid>
          </Grid>
          <hr color='#776118' style={{width: '100%'}} />
          <Flex justifyContent="center" marginTop="3em" flexDirection="column" alignItems="center">
            <Flex alignItems="center">
              <input type="checkbox" />
              <Text>&nbsp;I approve MGG Terms & Conditions</Text>
            </Flex>
            <Button marginTop="2em" className="btn-checkout">
              PLACE OFFER
            </Button>
          </Flex>
        </ModalSection>
        <div>
          <Text color='textSubtle'>
            MGG never holds or controls any of your cryptocurrencies. If you decide to cancel or change your offer, you will see your original token balance in Lorem. <span style={{color: theme.colors.MGG_accent2}}>Add Lorem to wallet</span>
          </Text>
        </div>
      </div>
    </Modal>
  )
}

export default PlaceOfferModal

PlaceOfferModal.defaultProps = {
  onDismiss: () => null,
}

const ModalSection = styled(Flex)`
  margin: 2rem 0;
  flex-direction: column;
  & > ${Flex} {
    margin-bottom: 1.5rem;
  }
`
