import styled from 'styled-components'

const StyledTable = styled.table`
  width: 100%;
  text-align: left;
`
export default StyledTable

export const StyledTableHead = styled.thead<{ withUnderline?: boolean }>`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5rem;
  ${({ withUnderline, theme }) =>
    withUnderline &&
    `
  border-bottom: 1px solid ${theme.colors.MGG_accent2};
  `}
`

export const StyledTableBody = styled.tbody`
  color: ${({ theme }) => theme.colors.text};
`
export const StyledTr = styled.tr`
  font-size: 10px;
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 17px;
  }
`
export const StyledTd = styled.td`
  width: 1%;
  padding: 1.5rem 0;
  font-size: 1em;
  color: ${({theme}) => theme.colors.text};
`
export const StyledTh = styled.th`
width: 1%;
padding: 1rem 0;
font-size: 1.5em;
`
