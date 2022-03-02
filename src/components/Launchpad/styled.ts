import styled from 'styled-components'
import { CardHeader, Flex, Button } from '@sparkpointio/sparkswap-uikit'

export const Header = styled(CardHeader)<{ src?: string }>`
  display: flex;
  padding: 20px;
  align-items: flex-start;
  position: relative;
  min-height: 15vh;
  justify-content: flex-end;
  ${({ src }) =>
    src &&
    `
        &:before {
            content: ' ';
            display: block;
            position: absolute;
            left: 0;
            top: 0;
            opacity: 0.3;
            width: 100%;
            height: 100%;
            z-index: 1;
            background-image: url(${src});
            background-repeat: no-repeat;
            // background-attachment: fixed;
            background-position: center;
            background-size: cover;
        }
    `}
`
export const TimerBox = styled(Flex)`
  & > * {
    flex: 1;
    margin-right: 10px;
  }
`
export const TimerContainer = styled(Flex)`
  background-color: rgba(41, 178, 19, 1);
`

export const InfoBox = styled(Flex)`
    width; 100%;
    & > * {
      margin-top: 5px;
    }
`

export const InfoRow = styled(Flex)`
  width: 100%;
`
export const StatusColor = {
  ongoing: '#32a31b',
  upcoming: '#7a1ba3',
  completed: '#8e98a5',
}

export const StatusBox = styled(Flex)<{ status: string }>`
  background-color: ${({ status, theme }) => (status ? StatusColor[status] : theme.colors.primary)};
  border-radius: 3px;
`

export const PostHeader = styled(Header)<{background?:string}>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // background-position: 50% 78%;
  // background-size: cover;
  // background-repeat: no-repeat;
  border-top: 3px solid ${(({theme}) => theme.colors.MGG_active)};
  border-bottom: 3px solid ${(({theme}) => theme.colors.MGG_active)};
  ${({ background }) =>
  background &&
  `
      &:before {
          content: ' ';
          display: block;
          position: absolute;
          left: 0;
          top: 0;
          opacity: 0.2;
          width: 100%;
          height: 100%;
          z-index: 1;
          background-image: url(${background});
          background-repeat: no-repeat;
          // background-attachment: fixed;
          background-position: center;
          background-size: cover;
      }
  `}
  & > * {
    position: relative;
    z-index: 2;
  }
`
export const PostBody = styled(Flex)`
  width: 100%;
  padding: 20px 30px;
  background-color: ${({ theme }) => theme.card.background};
  flex-direction: column;
  & > * {
    z-index: 1;
  }
`
export const PostContainer = styled.div`
  width: 100%;
  position: relative;
`

export const TokenProperty = styled(Flex)`
  background-color: ${({ theme }) => theme.colors.MGG_accent2};
  border-radius: 25px;
  min-width: 80px;
  margin: 0px 10px;
  justify-content: center;
  align-items: center;
  & > * {
    font-size: 12px;
    font-weight: bold;
    margin: 5px 10px;
  }
  // @media (max-width: 500px) {
  //   width: auto;
  //   min-width: auto;
  // }
`

export const Details = styled(Button)`
  background-color: ${(({theme}) => theme.colors.MGG_mainBG)};
  border-radius: 5px;
  height: 40px;
  margin-left: 15px;
  color: ${(({theme}) => theme.colors.text)}
  @media (max-width: 500px) {
    width: 40%;
  }
`

export const NavOption = styled(Button)<{ activeIndex: boolean }>`
  background-color: transparent;
  color: ${({ theme, activeIndex }) => (activeIndex ? theme.colors.text : theme.colors.textSubtle)};
  border-bottom: ${({ theme, activeIndex }) => activeIndex && `3px solid ${theme.colors.primary}`};
`
export const SaleContainer = styled(Flex)`
  margin: 10px 0px;
  & > * {
    width: 45%;
  }
`

export const SaleRow = styled(Flex)`
  margin: 10px 0px;
`

export const PadTitles = styled(Flex)`
flex-direction: column;
align-items: flex-start;
  ${(({theme}) => `
    ${theme.mediaQueries.md} {
      flex-direction: row;
      align-items: center;
    }
  `)}
`

export const PadActions = styled(Flex)`
flex-direction: column;
align-items: flex-end;
  ${(({theme}) => `
    ${theme.mediaQueries.md} {
      flex-direction: row;
      align-items: center;
    }
  `)}
`