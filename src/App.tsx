import React, { lazy } from 'react'
import { HashRouter, Redirect, Route, Switch, Link } from 'react-router-dom'
import { ResetCSS } from '@metagg/mgg-uikit'
import BigNumber from 'bignumber.js'
import useEagerConnect from 'hooks/useEagerConnect'
import { useFetchProfile, usePollBlockNumber, usePollCoreFarmData } from 'state/hooks'
import { RedirectToFarms, RedirectToPools } from 'views/Farms/Redirects'
import GlobalStyle from './style/Global'
import Menu from './components/Menu'
import SuspenseWithChunkError from './components/SuspenseWithChunkError'
import ToastListener from './components/ToastListener'
import PageLoader from './components/PageLoader'
import EasterEgg from './components/EasterEgg'
// import Pools from './views/Pools'

// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page
// const Home = lazy(() => import('./views/Home'))
const Farms = lazy(() => import('./views/Farms'))
const Pools = lazy(() => import('./views/Pools'))
const Gamefi = lazy(() => import('./views/Gamefi'))
const ComingSoon = lazy(() => import('./views/ComingSoon'))
const Guildpad = lazy(() => import('./views/GuildPad'))
const Lottery = lazy(() => import('./views/Lottery'))
const Ifos = lazy(() => import('./views/Ifos'))
const NotFound = lazy(() => import('./views/NotFound'))
const Pad = lazy(() => import('./views/GuildPad/Pad'))
const FarmPage = lazy(() => import('./views/Farms/NewUI/FarmPage'))
// const Collectibles = lazy(() => import('./views/Collectibles'))
// const Teams = lazy(() => import('./views/Teams'))
// const Team = lazy(() => import('./views/Teams/Team'))
// const Profile = lazy(() => import('./views/Profile'))
// const TradingCompetition = lazy(() => import('./views/TradingCompetition'))
// const Predictions = lazy(() => import('./views/Predictions'))

// This config is required for number formatting
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const ExternalRedirect = ({ to, ...routeProps }) => {
  return <Redirect to={to} />
}

const App: React.FC = () => {
  usePollBlockNumber()
  useEagerConnect()
  useFetchProfile()
  usePollCoreFarmData()

  return (
    <HashRouter>
      <ResetCSS />
      <GlobalStyle />
      <Menu>
        <SuspenseWithChunkError fallback={<PageLoader />}>
          <Switch>
            <Route path="/farms">
              <Farms />
            </Route>
            <Route path="/pools" exact>
              <Pools />
              {/* <ComingSoon title="Pools" /> */}
            </Route>
            <Route path="/gamefi" exact>
              <ComingSoon title="GameFi Vaults" />
              {/* <Gamefi /> */}
            </Route>
            <Route path="/launchpad" exact>
              {/* <ComingSoon title="Launchpad" /> */}
              <Guildpad />
            </Route>
            <Route path='/launchpad/:guildpadTitle' component={Pad}/>
            <Route path='/gamefi/:type/:farmID' component={FarmPage}/>
            <Route path='/earning-dashboard' exact>
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
