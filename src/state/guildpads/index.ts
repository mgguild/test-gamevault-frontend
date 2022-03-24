/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import guildpadsConfig from 'config/constants/guildpads'
import { Guildpad, GuildpadState } from '../types'
import fetchGuildpads from './fetchGuildpads'
import {
  fetchGuildpadIgoUserDetails,
  fetchGuildpadIsUserWhitelisted,
  fetchGuildpadUserBoxes,
  fetchIsWhitelisted, 
  fetchDistributedAmount
} from './fetchGuildpadUser'
import mergingGuildpads from './mergingGuildpads'

const noAccountGuildpadConfig = guildpadsConfig.map((guildpad) => ({
  ...guildpad,
  totalSold: '0',
  totalRaise: '0',
  userData: {
    boxesBought: '0',
    isWhitelisted: false,
    details: {},
  },
  hasStarted: false,
  hasEnded: false,
  totalSupply: '0',
  boxInfo: {
    1: {
      price: '0',
      supply: '0',
      sold: '0',
    },
  },
  buyLimitEnabled: false,
  buyLimit: '0',
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
  boxesBought?: string
  isWhitelisted?: boolean
  details?: any
  vesting?: any
}

export const fetchGuildpadUserDataAsync = createAsyncThunk<GuildpadUserDataResponse[], { account: string; ids: number[] }>(
  'farms/fetchGuildpadUserDataAsync',
  async ({ account, ids }) => {
    const guildpadToFetch = guildpadsConfig.filter((guildpadConfig) => ids.includes(guildpadConfig.id))
    const useGuildpadBoxes = await fetchGuildpadUserBoxes(account, guildpadToFetch)
    const useGuildpadIsWhitelist = await fetchGuildpadIsUserWhitelisted(account, guildpadToFetch)
    const useGuildpadIgoUserDetails = await fetchGuildpadIgoUserDetails(account, guildpadToFetch)
    const useGuildPadVestingIsWhitelist = await fetchIsWhitelisted(account, guildpadToFetch)
    const useGuildPadVestingDistributedAmount = useGuildPadVestingIsWhitelist ? await fetchDistributedAmount(account, guildpadToFetch) : []
    return guildpadToFetch.map((gpad, index) => {
      const details = useGuildpadIgoUserDetails.filter((data) => { return data.id === gpad.id})[0]
      return {
        id: gpad.id,
        boxesBought: useGuildpadBoxes[index] ?? '0',
        isWhitelisted: useGuildpadIsWhitelist[index] ?? false,
        details: details?.details ?? {},
        vesting: {isWhitelisted: useGuildPadVestingIsWhitelist, distributedAmount: useGuildPadVestingDistributedAmount}
      }
    })
  },
)

export const guildpadSlice = createSlice({
  name: 'Guildpads',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Update guildpad with live data
    builder.addCase(fetchPublicGuildpadDataAsync.fulfilled, (state, action) => {
      state.data = state.data.map((guildpad) => {
        const liveGuildpadData = action.payload.find((guildpadData) => guildpadData.id === guildpad.id)
        return { ...guildpad, ...liveGuildpadData }
      })

      // Merging Here
      // const merges = mergingGuildpads(state.data)
      // if (merges && merges.length) {
      //   state.data = [...state.data, ...merges]
      // }
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
