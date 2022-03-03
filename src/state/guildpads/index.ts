/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import BigNumber from 'bignumber.js'
import guildpadsConfig from 'config/constants/guildpads'
import { GUILDPAD_STATUS } from 'config/constants/types'
import { Guildpad, GuildpadState } from '../types'
import fetchGuildpads from './fetchGuildpads'
import { fetchGuildpadIsUserWhitelisted, fetchGuildpadUserBoxes } from './fetchGuildpadUser'

const noAccountGuildpadConfig = guildpadsConfig.map((guildpad) => ({
  ...guildpad,
  totalSold: '0',
  totalRaise: '0',
  userData: {
    boxesBought: '0',
    isWhitelisted: false,
  },
  hasStarted: false,
  hasEnded: false,
  totalSupply: '0',
  boxInfo: {
    1: {
      price: '0',
      supply: '0',
      sold: '0'
    }
  },
  buyLimitEnabled: false,
  buyLimit: '0'
}))

const initialState: GuildpadState = { data: noAccountGuildpadConfig, userDataLoaded: false }

// Async thunks
export const fetchPublicGuildpadDataAsync = createAsyncThunk<Guildpad[], number[]>(
  'guildpad/fetchPublicGuildpadDataAsync',
  async (ids) => {
    const guildpadToFetch = guildpadsConfig.filter((guildpadConfig) => ids.includes(guildpadConfig.id))
    const guildpads = await fetchGuildpads(guildpadToFetch)

    await mergingGuildpads(guildpads)
    return guildpads
  },
)

// export const updateGuildpadStatus = createAsyncThunk('guildpad/updateGuildpadStatus', async() => {

// })

interface GuildpadUserDataResponse {
  id: number
  boxesBought: string
  isWhitelisted?: boolean
}

export const fetchGuildpadUserDataAsync = createAsyncThunk<GuildpadUserDataResponse[], { account: string; ids: number[] }>(
  'farms/fetchGuildpadUserDataAsync',
  async ({ account, ids }) => {
    const guildpadToFetch = guildpadsConfig.filter((guildpadConfig) => ids.includes(guildpadConfig.id))
    const useGuildpadBoxes = await fetchGuildpadUserBoxes(account, guildpadToFetch)
    const useGuildpadIsWhitelist = await fetchGuildpadIsUserWhitelisted(account, guildpadToFetch)
    return useGuildpadBoxes.map((box, index) => {
      return {
        id: guildpadToFetch[index].id,
        boxesBought: box,
        isWhitelisted: useGuildpadIsWhitelist[index],
      }
    })
  },
)

// Merging guildpads
const mergingGuildpads = async (guildpads: Guildpad[]) => {
  guildpads.forEach((guildpad, index) => {
    // Find toMergeID property exists and check if ended and completed
    if(guildpad.nextRoundID && guildpad.hasEnded && guildpad.status === GUILDPAD_STATUS.completed){
      // copy all first round values
      const mergedGP = guildpads[index]

      // Get next round GP
      const toMergeGP = guildpads.filter((gp) => gp.id === guildpad.nextRoundID)[0]

      if(toMergeGP && toMergeGP.hasEnded && toMergeGP.status === GUILDPAD_STATUS.completed){
        Object.keys(guildpads[index]).forEach((key) => {
          if(key === 'totalSold' || key === 'totalRaise'){
            // Sum of totalSold and totalsRaise of from rounds
            mergedGP[key] = new BigNumber(guildpads[index][key]).plus(new BigNumber(toMergeGP[key])).toString()
          }
          if(key === 'epochEndDate'){
            // get latest round epochEndDate
            mergedGP[key] = toMergeGP[key]
          }
        })
        mergedGP.round = `MERGED ${mergedGP.title}`
        mergedGP.display = true

        guildpadSlice.actions.addGuildpad(mergedGP)
      }
    }
  })
}

export const guildpadSlice = createSlice({
  name: 'Guildpads',
  initialState,
  reducers: {
    addGuildpad(state, action: PayloadAction<Guildpad>) {
      console.log('gpNewEmpty Bruh', action)
      state.data.push(action.payload)
    }
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
