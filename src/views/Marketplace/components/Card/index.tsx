import { Flex, Text } from '@metagg/mgg-uikit'
import useTheme from 'hooks/useTheme'
import React from 'react'
import styled from 'styled-components'
import { TextWrap } from 'views/Marketplace/styled'
import Button from '../Button'

const Card: React.FC = () => {
  const { theme } = useTheme()
  return (
    <Container>
      <Wrapper>
        <Flex flexDirection='column' alignItems='center'>
          Image
          <TextWrap textAlign="center">
            <Text fontSize="2em" bold color={theme.colors.MGG_accent2}>
              Create
            </Text>
          </TextWrap>
        </Flex>
        <TextWrap textAlign="center">
          <Text fontSize="1em">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur cupiditate possimus sequi itaque,
            repudiandae cum voluptas corrupti eveniet ex! Odio ipsum delectus blanditiis nisi impedit nihil consequatur,
            maiores dolore. Nemo?
          </Text>
          <Button bg={theme.colors.MGG_accent2} margin='15px 0px'>Lorem Ipsum</Button>
        </TextWrap>
      </Wrapper>
    </Container>
  )
}

export default Card

const Wrapper = styled.div`
  & > * {
    margin: 10px 0px;
  }
`

const Container = styled.div`
  border: 1px inset ${(props) => props.theme.colors.MGG_accent2};
  background-color: ${props => props.theme.isDark? '#0c012c' : props.theme.colors.MGG_container};
  margin: 1rem 0;
  padding: 1.5rem;
  min-height: 200px;
  width: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${props => props.theme.mediaQueries.lg} {
    margin: 1rem;
  }
`
