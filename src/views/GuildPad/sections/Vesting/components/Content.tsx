import { Flex, Text } from '@metagg/mgg-uikit'
import { NavOption, PostBody } from 'components/Launchpad/styled'
import useTheme from 'hooks/useTheme'
import React, { useState } from 'react'

interface Props {
  description?: string
}

const Content:React.FC<{details: Props}> = ({details}) => {
  const [active, setActive] = useState<number>(0)
  const { theme } = useTheme()

  const renderDescription = () => {
    const description = details.description
    return (
      <Text> { description} </Text>
    )
  }

  const renderTabs = (tab) => {
    switch(tab) {
      case 0:
        return renderDescription()
      case 1:
        return 'claim'
      default:
        return 'coming soon'
    }
  }

  return (
    <PostBody>
      <Flex
        alignItems="center"
        margin="10px 0px 20px 0px"
        style={{ borderBottom: `0.5px solid ${theme.colors.primary}`, width: '100%' }}
      >
        <NavOption onClick={() => setActive(0)} activeIndex={active === 0}>
          Description
        </NavOption>
        <NavOption onClick={() => setActive(1)} activeIndex={active === 1}>
          Claim
        </NavOption>
      </Flex>
      { renderTabs(active) }
    </PostBody>
  )
}

Content.defaultProps = {
  details: {
    description: ''
  }
}

export default Content

