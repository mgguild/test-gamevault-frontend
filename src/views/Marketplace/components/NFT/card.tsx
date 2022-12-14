import React from 'react'
import { BsShieldFillCheck, BsFillRecordFill } from 'react-icons/bs'
import { NftCat, NftConfig } from 'config/constants/Marketplace/types'
import useTheme from 'hooks/useTheme'
import fetchNftImage from 'utils/fetchNftImage'
import SvgIcon from 'components/SvgIcon'
import { Flex, Text, Heading } from '@metagg/mgg-uikit'
import { CardContainer, FontResponsive } from './styled'

const NftCard: React.FC<NftConfig> = ({ name, description, src, price, status, category }) => {
  const { theme } = useTheme()

  const img = fetchNftImage[`${src}`]
  return (
    <CardContainer>
      <Flex alignItems="center" justifyContent="space-between">
        <FontResponsive>
          <Text fontSize="2.5em" bold>
            {name}
          </Text>
        </FontResponsive>
        <BsShieldFillCheck fontSize="2em" fill={theme.colors.primary} />
      </Flex>
      <Flex flexDirection="column" style={{ textAlign: 'left', margin: '0.5rem 0' }}>
        <SvgIcon Img={img} width={250} />
        <br />
        <Text fontSize="1em">{description}</Text>
      </Flex>
      <Flex alignItems="center" justifyContent="flex-end">
        <BsFillRecordFill fill={NftCat[`${category.toLowerCase()}`]} />
        <Text color={theme.colors.MGG_accent2} fontSize="1.5em">
          &nbsp;{price}
        </Text>
      </Flex>
    </CardContainer>
  )
}

export default NftCard
