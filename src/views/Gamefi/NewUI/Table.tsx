import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { useTable } from 'react-table'
import { Text } from '@metagg/mgg-uikit'

const RenderTable = ({ columns, data }) => {
  const theme = useContext(ThemeContext)
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data })

  return (
    <table {...getTableProps()}>
      <thead style={{ width: '100%' }}>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>
                <Text color={theme.colors.MGG_accent2}>{column.render('Header')}</Text>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td {...cell.getCellProps()}>
                    <Text>{cell.render('Cell')}</Text>
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default RenderTable
