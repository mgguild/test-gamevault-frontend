import { Grid } from '@mui/material'
import { Text } from '@metagg/mgg-uikit'
import useTheme from 'hooks/useTheme'
import styled from 'styled-components'
import React, { useState } from 'react'
import Tab from '../components/Tab'
import Table from '../components/Table'
import { BgPage, Section } from '../styled'
import { TabOptions } from './config'



const HistorySection = () => {
  const { theme } = useTheme()

  const [ active, setActive ] = useState<number>(0)

  const data = [
    {
      items: 'Doge',
      date: '9/12/2022 03:33PM',
      price: '1',
      status: 'ADDED',
      actions: 'CANCEL'
    }
  ]
  const columns = React.useMemo(() => {
    return [
      {
        Header:  <Text fontSize='2rem' color="#ebca03" bold>ITEMS</Text>,
        accessor: 'items'
      },
      {
        Header: <Text fontSize='2rem' color="#ebca03" bold>DATE</Text>,
        accessor: 'date'
      },
      {
        Header: <Text fontSize='2rem' color="#ebca03" bold>PRICE</Text>,
        accessor: 'price'
      },{
        Header: <Text fontSize='2rem' color="#ebca03" bold>STATUS</Text>,
        accessor: 'status'
      },
      {
        Header: <Text fontSize='2rem' color="#ebca03" bold>ACTIONS</Text>,
        accessor: 'actions'
      }
    ]
  }, [])

  return (
    <Section padding="0" bgColor={theme.isDark ? '#140937' : theme.colors.MGG_container}>
      <BgPage>
        <div style={{ margin: '10rem 0', position: 'relative', zIndex: 2, minHeight: '50vh' }}>
          <Tab options={TabOptions} handlers={{active, setActive}} />
          <StyledDiv>
            { data.length !== 0 ? <Table columns={columns} data={data} withUnderline /> : <Text>No Offers</Text>}
          </StyledDiv>
        </div>
      </BgPage>
    </Section>
  )
}

export default HistorySection

const StyledDiv = styled.div`
  margin-top: 2rem;
  padding: 2rem;
  border: 1px solid ${({theme}) => theme.colors.MGG_accent2};
  background-color: ${({theme}) => theme.isDark ? '#0c012c' : theme.colors.background };
`