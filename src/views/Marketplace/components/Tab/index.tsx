import { Button, Flex } from '@metagg/mgg-uikit'
import useTheme from 'hooks/useTheme'
import styled from 'styled-components'
import React, { Dispatch, SetStateAction } from 'react'
import './style.css'

interface Props {
  options: string[]
  handlers: {
    active: number
    setActive: Dispatch<SetStateAction<number>>
  }
}

const Tab = ({ options, handlers }: Props) => {
  const { theme } = useTheme()
  return (
    <>
      <Flex justifyContent="space-around">
        {options.map((option, key) => (
          <TabButton key={option} variant="secondary" className="tab-btn" onClick={() => handlers.setActive(key)} activeIndex={handlers.active === key}>
            {option.toUpperCase()}
          </TabButton>
        ))}
      </Flex>
      <hr color={theme.colors.MGG_accent2} />
    </>
  )
}

export default Tab

const TabButton = styled(Button)<{activeIndex?: boolean}>`
  border-radius: 5px;
  border: none;
  color: #b5b3be;
  ${({activeIndex, theme}) => activeIndex && `
    background-color: ${theme.colors.MGG_accent2};
    color: #fff;
  `}

  &:hover {
    background-color ${({theme}) => theme.colors.MGG_accent2}!important;
    color: #fff;
  }
`