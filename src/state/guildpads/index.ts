/* eslint-disable no-param-reassign */
import { useSelector } from 'react-redux'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import guildpadsConfig from 'config/constants/guildpads'
import { AppThunk, Guildpad, GuildpadState, State } from '../types'
import fetchGuildpads from './fetchGuildpads'
import { GuildpadConfig } from '../../config/constants/types'
import farmsConfig from '../../config/constants/farms'
import {
  fetchFarmUserAllowances, fetchFarmUserEarnings,
  fetchFarmUserStakedBalances,
  fetchFarmUserTokenBalances,
} from '../farms/fetchFarmUser'
import { fetchGuildpadUserBoxes } from './fetchGuildpadUser'

const noAccountGuildpadConfig = guildpadsConfig.map((guildpad) => ({
  ...guildpad,
  userData: {
    boxesBought: '0',
  }
}))

const initialState: GuildpadState = { data: noAccountGuildpadConfig, userDataLoaded: false }

// Async thunks
export const fetchPublicGuildpadDataAsync = createAsyncThunk<Guildpad[], number[]>(
  'guildpad/fetchPublicGuildpadDataAsync',
  async (ids) => {
    const guildpadToFetch = guildpadsConfig.filter((guildpadConfig) => ids.includes(guildpadConfig.id))
    const guildpads = await fetchGuildpads(guildpadToFetch)

    return guildpads
  },
)

// export const updateGuildpadStatus = createAsyncThunk('guildpad/updateGuildpadStatus', async() => {

// })

interface GuildpadUserDataResponse {
  id: number
  boxesBought: string
}

export const fetchGuildpadUserDataAsync = createAsyncThunk<GuildpadUserDataResponse[], { account: string; ids: number[] }>(
  'farms/fetchGuildpadUserDataAsync',
  async ({account, ids}) => {
    const guildpadToFetch = guildpadsConfig.filter((guildpadConfig) => ids.includes(guildpadConfig.id))
    const useGuildpadBoxes = await fetchGuildpadUserBoxes(account, guildpadToFetch)

    return useGuildpadBoxes.map((box, index) => {
      return {
        id: guildpadToFetch[index].id,
        boxesBought: box
      }
    })
  }
)

export const guildpadSlice = createSlice({
  name: 'Guildpads',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    // Update guildpad with live data
    builder.addCase(fetchPublicGuildpadDataAsync.fulfilled, (state, action) => {
      state.data = state.data.map((guildpad) => {
        const liveGuildpadData = action.payload.find((guildpadData) => guildpadData.id === guildpad.id)
        return { ...guildpad, ...liveGuildpadData }
      })
    })

    // Update guildpad with user data
    builder.addCase(fetchGuildpadUserDataAsync.fulfilled, (state, action) => {
      action.payload.forEach((userDataEl) => {
        const { id } = userDataEl
        const index = state.data.findIndex((guildpad) => guildpad.id === id)
        state.data[index] = { ...state.data[index], userData: userDataEl }
      })
      state.userDataLoaded = true
    })
  },
})

// Actions
// export const { setLoadArchivedGuildpadData } = guildpadSlice.actions

export default guildpadSlice.reducer
