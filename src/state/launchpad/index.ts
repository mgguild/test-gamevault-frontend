/* eslint-disable no-param-reassign */

import { IGuildpad } from 'config/constants/types';
import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import Guildpads from 'config/constants/guildpads'
import { GuildpadState, AppThunk } from '../types'


const initialState: GuildpadState = {
  selected: null,
  data: Guildpads,
}


export const setGuildpad = (address: string): AppThunk => (dispatch) => {
  dispatch(selectGuildpad(address));
}

export const guildpadSlice = createSlice({
  name: 'Projects',
  initialState,
  reducers: {
    selectGuildpad:  (state, action: PayloadAction<string>) => {
          state.selected = action.payload
      }
  }
})

// Thunks 


export const { selectGuildpad } = guildpadSlice.actions;
export default guildpadSlice.reducer