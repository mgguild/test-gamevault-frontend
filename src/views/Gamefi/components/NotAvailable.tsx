import React from 'react'
import styled from 'styled-components'
import { Button, Heading, Text } from '@sparkpointio/sparkswap-uikit'
import { useTranslation } from 'contexts/Localization'

const StyledNotFound = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const NotAvailable = ({ title }) => {
  const { t } = useTranslation()

  return (
    <StyledNotFound>
      <img src="/logo.png" alt="LogoIcon" width="64px" style={{ marginBottom: '8px' }} />
      <Text mb="16px">{`No ${title} found`}</Text>
    </StyledNotFound>
  )
}

export default NotAvailable
