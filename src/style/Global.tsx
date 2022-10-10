import { createGlobalStyle } from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import { SparkSwapTheme } from '@metagg/mgg-uikit'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends SparkSwapTheme {}
}

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 12px;
    ${props => props.theme.mediaQueries.lg} {
      font-size: 16px;
    }
  }
  * {
    font-family: 'Kanit', sans-serif;
  }
  body {
    background-color: ${({ theme }) => theme.colors.background};
    
    img {
      height: auto;
      max-width: 100%;
    }
   
  }
`

export default GlobalStyle
