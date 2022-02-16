import React, { useContext } from 'react'
import moment from 'moment'
import styled, { ThemeContext } from 'styled-components'
import { Flex, Heading, Text, Modal, Button } from '@metagg/mgg-uikit'

interface ModalWhitelistProps{
  onDismiss?: () => void
  onBack?: () => void
  date: Date
}

const Content = styled.div`
  display: grid;
  row-gap: 2rem;
  text-align: center;
`

const HeadingIcon = styled(Heading)`
  border-width: thick;
  border-style: solid;
  border-color: #b80000;
  border-radius: 20rem;
  width: 5rem;
`

const ModalWhitelist: React.FC<ModalWhitelistProps> = ({
  onDismiss,
  onBack,
  date
}) => {
  const theme = useContext(ThemeContext);
  return (
    <Modal title='' onDismiss={onDismiss} onBack={onBack}>
      <Flex>
        <Content>
          <Flex alignItems='center' justifyContent='center'>
            <HeadingIcon size='xxl' color='#b80000'>X</HeadingIcon>
          </Flex>
          <Heading>SORRY, YOU ARE NOT WHITELISTED</Heading>
          <Text>Please come back to purchase box from {moment(date).utc().format('MM/DD/YYYY, hh:mm:ss A UTC')}</Text>
          <Flex alignItems='center' justifyContent='center'>
            <Button
              style={{padding: '0 3rem'}}
              color={theme.colors.MGG_active}
              onClick={onDismiss}
            >OK</Button>
          </Flex>
        </Content>
      </Flex>
    </Modal>
  )
}

export default ModalWhitelist