import React from 'react'
import { Search } from 'react-feather';
import styled from 'styled-components'

const SearchField = ({handleChange, placeHolder=''}: {handleChange: (e:React.ChangeEvent<HTMLInputElement>) => void; placeHolder?: string}) => {
  return (
    <Group>
      <SearchInput onChange={handleChange} placeholder={placeHolder}/>
      <Search className='search-icon' />
    </Group>
  )
}

export default SearchField;

SearchField.defaultProps = {
  placeHolder: ''
}

const Group = styled.div`
display: flex;
padding: 0 15px;
align-items: center;
border: 1px solid ${({theme}) => theme.colors.MGG_accent2};
.search-icon {
  color: ${({theme}) => theme.colors.text};
}
`

const SearchInput = styled.input`
background-color: transparent;
text-align: left;
border: none;
height: 5vh;
width: 100%;
font-size: 1.5em;
padding: 0px;
color: ${({theme}) => theme.colors.text};
&:focus {
  outline: none;
}
`