import useTheme from 'hooks/useTheme';
import React from 'react'
import { ChevronDown } from 'react-feather';
import styled from 'styled-components'

const SelectComponent = () => {
  const { theme } = useTheme()
  return (
    <SelectDiv>
      <Select>
        <SelectItem>Recently Listed</SelectItem>
        <SelectItem>STATUS</SelectItem>
        <SelectItem>STATUS</SelectItem>
        <SelectItem>STATUS</SelectItem>
      </Select>
      <ChevronDown color={theme.colors.MGG_accent2} />
    </SelectDiv>
  )
}

export default SelectComponent;
const SelectDiv = styled.div`
display: flex;
align-items: center;
margin: 0px 15px;
padding: 5px;
min-width: 200px;
background-color: ${({theme}) => theme.isDark? '#0c012c' : theme.colors.MGG_mainBG};
border: 1px solid ${({theme}) => theme.colors.MGG_accent2};
`
const Select = styled.select`
  width: 100%;
  padding: 0 5px;
  background-color: transparent;
  text-align: center;
  appearance: none;
  border: none;
  color: #fff;
  font-size: 1.5em;
  &:focus {
    outline: none;
  }
  
`

const SelectItem = styled.option`
  color: ${({theme}) => theme.colors.text};
  background-color:  ${({theme}) => theme.isDark? '#0c012c' : theme.colors.MGG_mainBG};
  outline: none;
`