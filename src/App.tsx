import React, { lazy } from 'react'
import { useWeb3React } from '@web3-react/core'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import { ResetCSS } from '@metagg/mgg-uikit'
import BigNumber from 'bignumber.js'
import useEagerConnect from 'hooks/useEagerConnect'
import { useFetchProfile, usePollBlockNumber, usePollCoreFarmData } from 'state/hooks'
import { RedirectToFarms } from 'views/Farms/Redirects'
import GlobalStyle from './style/Global'
import Menu from './components/Menu'
import SuspenseWithChunkError from './components/SuspenseWithChunkError'
import ToastListener from './components/ToastListener'
import PageLoader from './components/PageLoader'
import EasterEgg from './components/EasterEgg'
import { MAINNET_CHAIN_ID, multiChainSupport } from './config'
import NotSupported from './views/ComingSoon/notSupported'
import { getSupportedChain, isChainSupported } from './utils/settings'
// import Pools from './views/Pools'

// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page
// const Home = lazy(() => import('./views/Home'))
const Farms = lazy(() => import('./views/Farms'))
const Pools = lazy(() => import('./views/Pools'))
const Gamefi = lazy(() => import('./views/Gamefi'))
const ComingSoon = lazy(() => import('./views/ComingSoon'))
const Guildpad = lazy(() => import('./views/GuildPad'))
const NotFound = lazy(() => import('./views/NotFound'))
const Pad = lazy(() => import('./views/GuildPad/Pad'))

// This config is required for number formatting
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const ExternalRedirect = ({ to, ...routeProps }) => {
  return <Redirect to={to} />
}

const App: React.FC = () => {
  const { chainId } = useWeb3React()
  usePollBlockNumber()
  useEagerConnect()
  useFetchProfile()
  usePollCoreFarmData()
  const provider = (window as WindowChain).ethereum
  console.log(provider)

  return (
    <HashRouter>
      <ResetCSS />
      <GlobalStyle />
      <Menu>
        <SuspenseWithChunkError fallback={<PageLoader />}>
          <Switch>
            <Route path="/farms">
              {isChainSupported('STAKING', chainId) ? (
                <Farms />
              ) : (
                <NotSupported title="Farms" supportedChainId={getSupportedChain('STAKING')} />
              )}
            </Route>
            <Route path="/pools" exact>
              {isChainSupported('STAKING', chainId) ? (
                <Pools />
              ) : (
                <NotSupported title="Pools" supportedChainId={getSupportedChain('STAKING')} />
              )}
              {/* <ComingSoon title="Pools" /> */}
            </Route>
            <Route path="/gamefi" exact>
              {/* <ComingSoon title="GameFi Vaults" /> */}
              <Gamefi />
            </Route>
            <Route path="/launchpad" exact>
              {/* <ComingSoon title="Launchpad" /> */}
              {isChainSupported('LAUNCHPAD', chainId) ? (
                <Guildpad />
              ) : (
                <NotSupported title="Guildpad" supportedChainId={getSupportedChain('LAUNCHPAD')} />
              )}
            </Route>
            <Route path="/" exact>
              {/* <ComingSoon title="Launchpad" /> */}
              {isChainSupported('LAUNCHPAD', chainId) ? (
                <Guildpad />
              ) : (
                <NotSupported title="Guildpad" supportedChainId={getSupportedChain('LAUNCHPAD')} />
              )}
            </Route>
            <Route
              path="/launchpad/:guildpadTitle"
              component={(props) => {
                const { guildpadTitle } = props.match.params
                return isChainSupported('LAUNCHPAD', chainId) ? (
                  <Pad guildpadTitle={guildpadTitle} />
                ) : (
                  <NotSupported title="Guildpad" supportedChainId={getSupportedChain('LAUNCHPAD')} />
                )
              }}
            />
            <Route path="/earning-dashboard" exact>
              <ComingSoon title="Earning Dashboard" />
            </Route>
            <Route path="/staking">
              <Redirect to="/farms" />
            </Route>
            <Route path="/" component={RedirectToFarms} />
            {/* 404 */}
            <Route component={NotFound} />
            {/* External link for redirect */}
            <ExternalRedirect exact path="/apply" to="https://www.google.com" />
          </Switch>
        </SuspenseWithChunkError>
      </Menu>
      <EasterEgg iterations={2} />
      <ToastListener />
    </HashRouter>
  )
}

export default React.memo(App)
