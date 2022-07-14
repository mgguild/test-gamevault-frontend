/* eslint-disable import/prefer-default-export */
import styled from 'styled-components'

export const Container = styled.div<{src?: string}>`
  background-color: ${({theme}) => theme.colors.MGG_active};
  padding: 0px 0px;
  margin-bottom: 3rem;
  position: relative;
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
export const LogoContainer = styled.div`
  background: linear-gradient(0deg, rgb(0 0 0) 0%, rgb(0 0 0 / 50%) 25%, rgba(36, 121, 9, 0) 75%);
  width: 100%;
  height: 100%;
  display: flex;
`

export const MGGLogo = styled.img`
  width: 200px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
`