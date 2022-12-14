/* eslint-disable import/prefer-default-export */

// Config for carousel component settings

export interface BreakPointsConfig {
  width: number
  itemsToShow?: number
  itemsToScroll?: number
  pagination?: boolean
}

export const Car1breakpoints: BreakPointsConfig[] = [
  { width: 1, itemsToShow: 1, pagination: false },
  { width: 550, itemsToShow: 1 },
  { width: 768, itemsToShow: 1 },
  { width: 1150, itemsToShow: 3, itemsToScroll: 2 },
]

export const Car2breakpoints: BreakPointsConfig[] = [
  { width: 1, itemsToShow: 1, pagination: false },
  { width: 540, itemsToShow: 2, itemsToScroll: 1 },
  { width: 700, itemsToShow: 2, itemsToScroll: 1 },
  { width: 1150, itemsToShow: 4, itemsToScroll: 2 },
  { width: 1750, itemsToShow: 5, itemsToScroll: 2 },
]

export const Car3breakpoints: BreakPointsConfig[] = [
  { width: 1, itemsToShow: 1, pagination: false },
  { width: 540, itemsToShow: 2, itemsToScroll: 1 },
  { width: 700, itemsToShow: 2, itemsToScroll: 1 },
  { width: 1150, itemsToShow: 4, itemsToScroll: 2 },
  { width: 1750, itemsToShow: 5, itemsToScroll: 2 },
]
