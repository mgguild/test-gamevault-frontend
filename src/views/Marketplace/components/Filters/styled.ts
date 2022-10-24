import styled from 'styled-components'

const Container = styled.div`
  display: flex;
`

export default Container
export const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 2;
  padding: 2rem;
`
export const Main = styled.div`
  flex: 3 1;
  padding: 2rem;
`

export const FilterCard = styled.div`
  border: 2px solid ${({theme}) => theme.colors.MGG_accent2};
  border-radius: 5px;
  padding: 1rem;
  background-color: ${({theme}) => theme.isDark? '#0c012c' : theme.colors.MGG_mainBG};
`

export const FilterMenu = styled.div<{ justify?: string; align?: string }>`
  display: flex;
  align-items: ${(props) => props.align ?? 'center'};
  justify-content: ${(props) => props.justify ?? 'space-between'};
  margin-bottom: 2rem;
`

export const FilterSection = styled.div`
`
