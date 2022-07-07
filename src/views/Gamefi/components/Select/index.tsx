import React, { useContext } from 'react'
import { Grid, FormControl, InputLabel, MenuItem, FormHelperText } from '@mui/material'
import {Text} from '@metagg/mgg-uikit'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { ThemeContext } from 'styled-components';


const items = ['Apy', 'Rate']

const SelectComponent = ({handleSortBy, sortBy}:{handleSortBy: (string) => void; sortBy: string}) => {
  const theme = useContext(ThemeContext);
  const handleChange = (event: SelectChangeEvent) => {
    handleSortBy(event.target.value);
  };
  return (
    <FormControl sx={{ m: 1, minWidth: 120, }} style={{border: 'none', backgroundColor: theme.colors.MGG_container, borderRadius: '5px',}} size='small'>
      <InputLabel id="select-helper-label">
        <Text color='textSubtle'>
        Select
        </Text>
      </InputLabel>
      <Select labelId="select-helper-label" id="select-helper" value={sortBy} label="Sort" onChange={handleChange} style={{color: theme.colors.textSubtle}}>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        { items.map((item) => {
          return ( <MenuItem value={item.toLowerCase()}>
            { item}
          </MenuItem>)
        })}
      </Select>
    </FormControl>
  )
}

export default SelectComponent
