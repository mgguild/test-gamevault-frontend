import styled, { ThemeContext } from 'styled-components'

export const Cards2 = styled.button<{ src?: string; bgColor?: string }>`
  width: 100%;
  position: relative;
  min-width: 20rem;
  min-height: 12rem;
  cursor: pointer;
  border: none;
  padding: 0;
  text-align: left;
  flex: 1;
  background-color: ${({ bgColor }) => bgColor ?? '#030f62'};
  ${({ src }) =>
    `&:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0.2;
      width: 100%;
      height: 100%;
      z-index: 0;
      background-image: url(${src ?? `./MGG.png`});
      background-repeat: no-repeat;
      // background-attachment: fixed;
      background-position: center;
      background-size: cover;
    }`}
`

export const Card2Container = styled.div`
  display: grid;
  position: relative;
  padding: 1rem 1.5rem;
  background: linear-gradient(0deg, rgb(0 0 0) 0%, rgb(0 0 0 / 50%) 25%, rgba(36, 121, 9, 0) 75%);
  width: 100%;
  height: 100%;
  z-index: 2;
  grid-template-columns: 1fr 1fr;
`
export const TokenLogo = styled.img<{ size?: string }>`
  border-radius: 50%;
  height: ${({ size }) => (!size ? '80px' : size)};
  width: ${({ size }) => (!size ? '80px' : size)};
  z-index: 2;
  @media (max-width: 500px) {
    height: ${({ size }) => (!size ? '50px' : size)};
    width: ${({ size }) => (!size ? '50px' : size)};
  }
`

export const Badge = styled.div<{ type?: number }>`
  ${({ type }) =>
    type
      ? `
      padding: 0.2rem 0.5rem;
      border: thin solid white;
      border-radius: 0.3rem;
    `
      : `
      padding: 0.2rem 0.5rem;
      background-color: rgb(0,196,204);
      border-radius: 0.3rem;
    `}
`
