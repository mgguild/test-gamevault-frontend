import { Modal, Heading, Flex, IconButton } from '@metagg/mgg-uikit'
import React from 'react'
import { X } from 'react-feather';
import useTheme from 'hooks/useTheme';
import styled from 'styled-components';
import './styles.css'

interface Props {
  onDismiss?: () => void;
}

const BuyModal = ({onDismiss}:Props) => {
  const { theme } = useTheme()
  return (
    <Modal title='' onDismiss={onDismiss} hideCloseButton>
      <Flex justifyContent='space-between' alignItems='center'>
        <Heading size="lg" color={theme.colors.MGG_accent2}> 
          Buy Now
        </Heading>
        <IconButton variant="secondary" style={{border: 'none'}} onClick={onDismiss}>
        <X color={theme.colors.MGG_accent2} />
        </IconButton>
      </Flex>
    </Modal>
  )
}

export default BuyModal

BuyModal.defaultProps = {
  onDismiss: () => null,
}

