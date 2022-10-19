import React from 'react'
import styled from 'styled-components'

const Input = () => {
  return (
    <StyledInput type="number"/>
  )
}

export default Input;

const StyledInput = styled.input`
  background-color: transparent;
  border: 1px solid ${({theme}) => theme.colors.MGG_accent2};
  height: 5vh;
  width: 100%;
  font-size: 1.5em;
  padding: 5px;
  color: ${({theme}) => theme.colors.text};
  &:focus {
    outline: none;
  }
`