import { Flex, Text } from '@metagg/mgg-uikit'
import useTheme from 'hooks/useTheme'
import React from 'react'
import styled from 'styled-components'
import * as icons from 'react-feather'
import IMG from 'assets/marketplace/1.png'
import { TextWrap } from 'views/Marketplace/styled'
import Button from '../Button'
import { Icon, IconName } from '../Feathers'

interface Props {
  title: string
  description: string
  icn?: IconName
}

const Card: React.FC<Props> = ({ title, description, icn }) => {
  const { theme } = useTheme()
  const placeholder = <Icon name={icn} />
  return (
    <Container>
      <Wrapper>
      {placeholder}
        <Flex flexDirection="column" alignItems="center" justifyContent='flex-start' style={{height: '100%'}} marginTop='1rem'>
          <TextWrap textAlign="center">
            <Text fontSize="2em" bold color={theme.colors.MGG_accent2}>
              {title}
            </Text> 
          </TextWrap>
          <TextWrap textAlign='center'>
          <Text fontSize="1em">{description}</Text>
          </TextWrap>
        </Flex>
          <Button bg={theme.colors.MGG_accent2} margin="0.5rem 0px">
            Lorem Ipsum
          </Button>
      </Wrapper>
    </Container>
  )
}

export default Card

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  align-items: center;  
`

const Container = styled.div`
  border: 1px inset ${(props) => props.theme.colors.MGG_accent2};
  background-color: ${(props) => (props.theme.isDark ? '#0c012c' : props.theme.colors.MGG_container)};
  margin: 1rem 0;
  padding: 1.5rem;
  height: 100%;
  // width: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  // ${(props) => props.theme.mediaQueries.lg} {
  //   margin: 1rem;
  // }
`
