import React from 'react'
import styled from 'styled-components'

const SelectComponent = () => {
  return (
      <Select>
        <option>STATUS</option>
      </Select>
  )
}

export default SelectComponent;

const Select = styled.select`
  background-color: transparent;
  border: none;
  color: #fff;
  width: 100%;
  font-size: 1.5em;
  &:focus {
    border: none;
    outline: none;
  }
`