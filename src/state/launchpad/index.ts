
/* eslint-disable no-param-reassign */

import { IGuildpad } from 'config/constants/types';
import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux';
import Guildpads from 'config/constants/guildpads'
import { GuildpadState, AppThunk, State} from '../types'




const initialState: GuildpadState = {
  selected: null,
  data: Guildpads,
}

export const guildpadSlice = createSlice({
  name: 'Guildpads',
  initialState,
  reducers: {
    selectGuildpad:  (state, action: PayloadAction<IGuildpad>) => {
          state.selected = action.payload
      }
  }
})

// Thunks 

export const setGuildpad = (title: string): AppThunk => (dispatch) => {
  const guildpad = useSelector((state: State) => state.guildpads.data.find((data) => data.title === title));
  dispatch(selectGuildpad(guildpad));
}

/* 
  Create a function here for guildpads and export to state/actions.ts
  then state/actions.ts => state/hooks.ts => to app
*/


export const { selectGuildpad } = guildpadSlice.actions;
export default guildpadSlice.reducer