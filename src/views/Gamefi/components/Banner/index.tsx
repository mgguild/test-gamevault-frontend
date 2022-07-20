import React from 'react'
import { Container, MGGLogo, LogoContainer } from './styled'

const Banner: React.FC = () => {
  return (
    <Container>
      <LogoContainer>
        <MGGLogo src="./MGG.png" alt="mgg-logo" />
      </LogoContainer>
    </Container>
  )
}

export default Banner
