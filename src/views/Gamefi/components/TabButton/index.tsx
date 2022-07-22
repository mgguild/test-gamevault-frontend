import React, { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import { Button } from '@metagg/mgg-uikit'
import { useLocation, Link, useRouteMatch } from 'react-router-dom'
import { useTranslation } from 'contexts/Localization'

interface FarmTabButtonsProps {
  tabState: string
  tabAction: (value: string) => void
}

const FarmTabButtons: React.FC<FarmTabButtonsProps> = ({ tabState, tabAction }) => {
  const { url } = useRouteMatch()
  const { t } = useTranslation()

  let activeIndex
  switch (tabState) {
    case '':
      activeIndex = 0
      break
    case 'RENDER_ENDED':
      activeIndex = 1
      break
    default:
      activeIndex = 0
      break
  }

  return (
    <Wrapper>
      <ButtonMenu activeIndex={activeIndex === 0} onClick={() => tabAction('')}>
        {t('Live')}
      </ButtonMenu>
      <ButtonMenu activeIndex={activeIndex === 1} onClick={() => tabAction('RENDER_ENDED')}>
        {t('Finished')}
      </ButtonMenu>
    </Wrapper>
  )
}

export default FarmTabButtons

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.MGG_container};
  border-radius: 5rem;
  a {
    padding-left: 12px;
    padding-right: 12px;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 16px;
  }
  // & :first-child {
  //   border-radius: 5rem;
  // }
  // & :last-child {
  //   border-radius: 0rem 5rem 5rem 0rem;
  // }
`
const ButtonMenu = styled(Button)<{ activeIndex?: boolean }>`
  background-color: ${({ activeIndex, theme }) => (activeIndex ? theme.colors.MGG_active : 'transparent')};
  border: none;
  border-radius: 5rem;
`
