import styled from 'styled-components'

const StyledTable = styled.table`
  width: 100%;
  text-align: left;
`
export default StyledTable

export const StyledTableHead = styled.thead`
  color: ${({theme}) => theme.colors.text};
  font-size: 1.5rem;
`

export const StyledTableBody = styled.tbody`
  color: ${({theme}) => theme.colors.text};
`
export const StyledTr = styled.tr`
font-size: 10px;
${({theme}) => theme.mediaQueries.md } {
  font-size: 17px;
}
  
`
export const StyledTd = styled.td`
  padding: 0.5rem;
  font-size: 1em;  
`
export const StyledTh = styled.th`
  padding: 0.5rem;
  font-size: 1.5em;
`