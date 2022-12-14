import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.xl} {
    flex-direction: row;
  }
`

export default Container

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 3;
  padding: 0.5rem 0;
  ${({ theme }) => theme.mediaQueries.lg} {
    padding: 1rem;
  }
`
export const Main = styled.div`
  flex: 3 1;
  padding: 2rem 0;
  ${({ theme }) => theme.mediaQueries.lg} {
    padding: 1rem;
  }
  @media screen and (min-width: 1500px) {
    flex: 4 1;
  }
`

export const FilterCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.MGG_accent2};
  border-radius: 5px;
  padding: 1rem;
  background-color: ${({ theme }) => (theme.isDark ? '#0c012c' : theme.colors.MGG_mainBG)};
`

export const FilterMenu = styled.div<{ justify?: string; align?: string }>`
  display: flex;
  align-items: ${(props) => props.align ?? 'center'};
  justify-content: ${(props) => props.justify ?? 'space-between'};
  margin-bottom: 2rem;
  font-size: 12px;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 17px;
  }
`

export const FilterSection = styled.div``
