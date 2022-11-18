import React, { useMemo, useState } from 'react'
import { Text, Flex } from '@metagg/mgg-uikit'
import { BsRecordFill } from 'react-icons/bs'
import { ExternalLink } from 'react-feather'
import { useTable } from 'react-table'
import useTheme from 'hooks/useTheme'
import dataHandlers from './dataHandlers'
import StyledTable, { StyledTableBody, StyledTableHead, StyledTr, StyledTh, StyledTd } from './styled'


const Table = ({columns, data, withUnderline}: {columns: any; data: any; withUnderline?: boolean}) => {
  const { theme } = useTheme()
  const table = useTable({ columns, data })
  const { getTableProps, headerGroups, rows, prepareRow, getTableBodyProps } = table
  return data.length !== 0 ? (
    <StyledTable {...getTableProps()}>
      <StyledTableHead withUnderline={withUnderline}>
        {headerGroups.map((headerGroup) => (
          <StyledTr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <StyledTh {...column.getHeaderProps()}>{column.render('Header')}</StyledTh>
            ))}
          </StyledTr>
        ))}
      </StyledTableHead>
      <StyledTableBody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row)
          return (
            <StyledTr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <StyledTd {...cell.getCellProps()}>{cell.render('Cell')}</StyledTd>
              ))}
            </StyledTr>
          )
        })}
      </StyledTableBody>
    </StyledTable>
  ) : (
    <Text>No offers</Text>
  )
}

export default Table

Table.defaultProps = {
  withUnderline: false,
}