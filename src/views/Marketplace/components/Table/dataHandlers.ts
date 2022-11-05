import { Flex, Text } from '@metagg/mgg-uikit'
import { ExternalLink } from 'react-feather'
import { BsRecordFill } from 'react-icons/bs'
import useTheme from 'hooks/useTheme'
import { useEffect, useState } from 'react'

// const data = [
//   {
//     event: 'transfer',
//     price: '12.50',
//     from: '0x63a...e082',
//     to: ' ',
//     date: '9/12/2022 03:33PM',
//   },
// ]

// const tbodyRowRender = (choice) => {
//   console.log(choice())
//   switch(choice) {
//     case 'transfer':
//       return (
//         <Flex alignItems='center'>
//           <ExternalLink color={theme.colors.MGG_accent2}/>
//           <Text color={theme.colors.MGG_accent2}>Transfer</Text>
//         </Flex>
//       )
//     default:
//       return (
//         <Flex alignItems='center'>
//           <BsRecordFill />
//           <Text>{choice}</Text>
//         </Flex>
//       )
//   }
// }

const dataHandlers = (data) => {
  const details = {}
  data.map((d) => {
    return Object.entries(d).map((entry) => {
      switch(entry[0].toLowerCase()){
        case 'event':
            details[entry[0]] =  entry[1] === 'transfer' ? 'true': 'false' 
            return ''
        default: 
        details[entry[0]] =  entry[1] === 'transfer' ? 'true': 'false' 
        return ''
      }
    })
  })
  return details
}

export default dataHandlers
