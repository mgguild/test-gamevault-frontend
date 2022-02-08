import React from 'react'
import styled from 'styled-components'
import { Button, Heading, Text } from '@sparkpointio/sparkswap-uikit'
import Page from 'components/layout/Page'
import { useTranslation } from 'contexts/Localization'

const StyledNotFound = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  // height: calc(100vh - 64px);
  justify-content: center;
`

const NoLaunches = ({section}:{section: string}) => {
  const { t } = useTranslation()

  return (
    <StyledNotFound>
      <img src="/logo.png" alt="LogoIcon" width="100px" style={{ marginBottom: '8px' }} />
      <Text mb="16px">{`NO ${section} LAUNCHES`}</Text>
    </StyledNotFound>
  )
}

export default NoLaunches
