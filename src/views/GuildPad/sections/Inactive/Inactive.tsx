import React, { useState } from 'react'
import { Button, Flex, Text } from '@metagg/mgg-uikit'
import styled from 'styled-components'
import SearchInput from 'components/SearchInput'
import { GuildpadConfig } from 'config/constants/types'
import PageSection from '../Layout';
import { BoxContainer, BoxHeader, TabContainer } from '../styled'
import GuildBoard from '../../components/Tab/Board'
import { BgContainer } from '../Home/styled'

const ButtonTab = styled(Button)<{ activeIndex: boolean; borderRadius: string }>`
  border-radius: ${({ borderRadius }) => borderRadius};
  padding: 30px;
  background-color: ${({ activeIndex, theme }) => (activeIndex ? theme.colors.MGG_active : theme.colors.MGG_container)};
`

const SearchBar = ({ searchFn }) => {
    return (
      <Flex flex={2} justifyContent="flex-end">
        <SearchInput onChange={(e) => searchFn(e.target.value)} />
      </Flex>
    )
  }



const Inactive:React.FC<{guildpads?: GuildpadConfig[] | null}> = ({guildpads}) => {
    const [ activeIndex, setActiveIndex ] = useState<number>(1)

    return (
        <PageSection direction='column'>
            <BgContainer>
              <TabContainer>
                  <ButtonTab borderRadius="10px 0px 0px 0px" onClick={() => setActiveIndex(1)} fullWidth activeIndex={activeIndex === 1}><Text bold>UPCOMING LAUNCHES</Text></ButtonTab>
                  <ButtonTab borderRadius="0px 10px 0px 0px" onClick={() => setActiveIndex(2)} fullWidth activeIndex={activeIndex === 2}><Text bold>PAST LAUNCHES</Text></ButtonTab>
              </TabContainer>
              <BoxContainer>
                  <GuildBoard tab={activeIndex} guildpads={guildpads} />
              </BoxContainer>
            </BgContainer>
        </PageSection>
    )
}

export default Inactive;
