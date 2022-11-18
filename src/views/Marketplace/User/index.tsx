import useTheme from 'hooks/useTheme'
import React from 'react'
import { BgPage, Section } from '../styled'

const UserProfile: React.FC = () => {
  const { theme } = useTheme()
  return (
    <Section  padding="0" bgColor={theme.isDark ? '#140937' : theme.colors.MGG_container}>
      <BgPage>
        <div style={{ margin: '10rem 0', position: 'relative', zIndex: 2, minHeight: '50vh' }}>
      User Profile
      </div>
      </BgPage>
    </Section>
  )
}

export default UserProfile;