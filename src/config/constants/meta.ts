import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'MGG',
  description:
    'Stake MGG and earn token rewards',
  image: 'https://sparkswap.finance//images/192x192_App_Icon.png',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  switch (path) {
    case '/Liquidity':
      return {
        title: `${t('Home')} | ${t('MGG')}`,
      }
    case '/competition':
      return {
        title: `${t('Trading Battle')} | ${t('MGG')}`,
      }
    case '/prediction':
      return {
        title: `${t('Prediction')} | ${t('MGG')}`,
      }
    case '/gamefivaults':
      return {
        title: `${t('Vaults')} | ${t('MGG')} - ${t('Stake MGG and earn GameFi tokens!')}`,
      }
    case '/liquidity':
      return {
        title: `${t('Pools')} | ${t('MGG')} - ${t('Stake MGG and earn LP tokens!')}`,
      }
    case '/lottery':
      return {
        title: `${t('Lottery')} | ${t('MGG')}`,
      }
    case '/collectibles':
      return {
        title: `${t('Collectibles')} | ${t('MGG')}`,
      }
    case '/ifo':
      return {
        title: `${t('Initial Farm Offering')} | ${t('MGG')}`,
      }
    case '/teams':
      return {
        title: `${t('Leaderboard')} | ${t('MGG')}`,
      }
    case '/profile/tasks':
      return {
        title: `${t('Task Center')} | ${t('MGG')}`,
      }
    case '/profile':
      return {
        title: `${t('Your Profile')} | ${t('MGG')}`,
      }
    default:
      return null
  }
}
