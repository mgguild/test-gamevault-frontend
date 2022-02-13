/* eslint-disable no-param-reassign */

import { IGuildpad } from 'config/constants/types';
import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import Guildpads from 'config/constants/guildpads'
import { GuildpadState, AppThunk } from '../types'


const initialState: GuildpadState = {
  selectedProject: null,
  data: Guildpads,
}


export const setProject = (address: string): AppThunk => (dispatch) => {
  dispatch(selectProject(address));
}

export const projectSlice = createSlice({
  name: 'Projects',
  initialState,
  reducers: {
      selectProject:  (state, action: PayloadAction<string>) => {
          state.selectedProject = action.payload
      }
  }
})


export const { selectProject } = projectSlice.actions;
export default projectSlice.reducer