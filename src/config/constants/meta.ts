import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'Meta Gaming Guild',
  description:
    'Stake MGG and earn token rewards',
  image: 'https://app.metagg.com/MGG.png',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  switch (path) {
    case '/farms':
      return {
        title: `${t('Liquidity')} | ${t('MGG')}`,
      }
    case '/pools':
      return {
        title: `${t('Pools')} | ${t('MGG')}`,
      }
    case '/gamefi':
      return {
        title: `${t('GameFi Vaults')} | ${t('MGG')}`,
      }
    case '/launchpad':
      return {
        title: `${t('MGG Launchpad')} | ${t('MGG')}`,
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

export const getPadCustomMeta = (path: string, launchpad: string):PageMeta => {
  return {
    title: `MGG Guildpad > ${launchpad}`
  }
}