import React, { Dispatch, SetStateAction, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Grid } from '@mui/material'
import { Flex, Text, Button, Input } from '@metagg/mgg-uikit'
import { FarmWithStakedValue } from 'views/Gamefi/components/config'
import { Pool } from 'state/types'

const ButtonSM = styled(Button)`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  height: 2.5rem;
  border-radius: 4px;
`

const StyledDetails = styled(Flex)`
  width: 100%;
  flex-direction: column;
  & > * {
    justify-content: space-between;
    flex: 1;
    & :first-child {
      color: ${({theme}) => theme.colors.textSubtle};
    }
  }
  
`

interface ComponentProps {
    dayDuration: string
    dayFunction: Dispatch<SetStateAction<string>>
    currentFarm?: FarmWithStakedValue
    stakingType: string;
    currentPoolBased?:  Pool
}

const Component:React.FC<ComponentProps> = ({dayDuration, dayFunction, currentFarm, currentPoolBased, stakingType}) => {
    const theme = useContext(ThemeContext)
    const pairSymbol = stakingType === 'farm' ? currentFarm.lpSymbol : currentPoolBased.stakingToken.symbol
    return (
            <>
             <Flex justifyContent='center' style={{width: '100%'}}>
               <Grid container spacing={{xs: 2, md: 1}} justifyContent='center'>
                {
                  ['15', '90', '180', '365'].map((day) => (
                    <>
                      <Grid item xs={12} sm={3} md={3}>
                        <ButtonSM fullWidth onClick={() => dayFunction(day)} >
                          {`${day} Days`}
                        </ButtonSM>
                      </Grid>
                    </>
                  ))
                }
               </Grid>
             </Flex>
             <StyledDetails>
               <Flex>
                 <Text>
                   APY
                 </Text>
                 <Text>
                   2%
                 </Text>
               </Flex>
               <Flex>
                 <Text>
                   Max fine
                 </Text>
                 <Text>
                   60%
                 </Text>
               </Flex>
               <Flex>
                 <Text>
                   Max profit (estimated)
                 </Text>
                 <Text>
                   -
                 </Text>
               </Flex>
               <hr style={{width: '100%'}} />
               <Flex>
                 <Text>
                   You staked
                 </Text>
                 <Text>
                   1000 {pairSymbol}
                 </Text>
               </Flex>
               <Flex>
                 <Text>
                   Your balance
                 </Text>
                 <Text>
                   0 {pairSymbol}
                 </Text>
               </Flex>
               <Flex>
                 <Text>
                   Total staked 
                 </Text>
                 <Text>
                   10000.00 {pairSymbol}
                 </Text>
               </Flex>
             </StyledDetails>
             <Flex style={{ flex: '0 50%' }}>
                <Text>Amount</Text>
              </Flex>
              <Flex style={{ flex: '0 50%', justifyContent: 'end' }}>
                <ButtonSM>Deposit Max</ButtonSM>
              </Flex>
              <Flex style={{ flex: '0 100%', position: 'relative' }}>
                <Input style={{ padding: '1.5rem' }} placeholder="0" type="number" min="0" />
                <div style={{ position: 'absolute', top: '0.7rem', right: '1.5rem' }}>
                  <Text color={theme.colors.textSubtle}>
                    {pairSymbol}
                  </Text>
                </div>
              </Flex>
              <Flex style={{ flex: '0 100%', justifyContent: 'center' }}>
                <Button fullWidth>Stake</Button>
              </Flex>
              </> 
    )
}

export default Component

