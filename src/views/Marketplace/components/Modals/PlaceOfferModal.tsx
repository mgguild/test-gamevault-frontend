import { Flex, Heading, IconButton, Modal, Text } from '@metagg/mgg-uikit';
import styled from 'styled-components'
import useTheme from 'hooks/useTheme';
import React from 'react';
import { X } from 'react-feather';
import './styles.css'
import Input from '../Input';

interface Props {
  onDismiss?: () => void
}

const PlaceOfferModal = ({onDismiss}:Props) => {
  const { theme } = useTheme()
  return (
    <Modal title="" onDismiss={onDismiss} hideCloseButton>
      <div className='modal-body'>
        <Flex alignItems='center' justifyContent='space-between'>
          <Heading size='lg' color={theme.colors.MGG_accent2}>
            Place an offer
          </Heading>
          <IconButton variant='secondary' style={{ border: 'none'}} onClick={onDismiss}>
            <X color={theme.colors.MGG_accent2} />
          </IconButton>
        </Flex>
        <ModalSection>
          <Flex flexDirection='column' style={{width: '100%'}}>
            <Heading size='lg'>Price</Heading>
            <input className='input-price' />
          </Flex>
        </ModalSection>
      </div>
    </Modal>
  )
}

export default PlaceOfferModal;

PlaceOfferModal.defaultProps = {
  onDismiss: () =>  null,
}

const ModalSection = styled(Flex)`
 margin: 2rem 0;
`