import React, { useContext } from 'react'
import { Flex, Text, Heading, Button } from '@metagg/mgg-uikit'
import { AboutColumn as Column, TwoColumn, TierColumns } from 'components/Column'
import { SvgProps } from 'components/SvgIcon/types'
import SvgIcon from 'components/SvgIcon'
import { ThemeContext } from 'styled-components'
import {ReactComponent as InoRequirementIcon} from 'assets/InoReq.svg'
import {
  StyledContainer,
  StyledHeading,
  StyledTitle,
  Image,
  Box,
  BoxHeading,
  TierTitle,
  TierDetails,
  TierFooter,
  StyledLink,
} from './styled'
import DetailsList, { TierSystemList } from './config'
import { Details, TierSystem } from './types'
import * as IconModule from './icons'
import PageSection from '../Layout'
import { BoxContainer, BoxHeader } from '../styled'


const Icons = IconModule as unknown as { [key: string]: React.FC<SvgProps> }
const Tiers = IconModule as unknown as { [key: string]: React.FC<SvgProps> }
/* Update and create separate Tier component */

const DetailBox = ({ image, title, description }: Details) => {
  const Icon = Icons[image]
  const iconElement: React.ReactElement = <Icon width="24px" mr="8px" height="24" />
  return (
    <Box>
      {iconElement}
      <div style={{ textAlign: 'center', margin: '10px' }}>
        <BoxHeading>{title}</BoxHeading>
        <Text fontSize="14px" color="textSubtle" >
          {description}
        </Text>
      </div>
    </Box>
  )
}

const RenderDetails = () => {
  return DetailsList.map((item) => {
    return <DetailBox key={item.title} image={item.image} title={item.title} description={item.description} />
  })
}

const RenderTierSystem = () => {
  return TierSystemList.map((item) => {
    // const { image, title, requirement, poolWeight, guaranteedAllocation } = item;
    return (
      <TierBox
        key={item.title}
        image={item.image}
        title={item.title}
        nftRequirement={item.nftRequirement}
        requirement={item.requirement}
        poolWeight={item.poolWeight}
        stakingLength={item.stakingLength}
        whitelistRequirement={item.whiteListRequirement}
      />
    )
  })
}

const TierBox = ({
  image,
  title,
  requirement,
  nftRequirement,
  poolWeight,
  whitelistRequirement,
  stakingLength,
}: TierSystem) => {
  const Tier = Tiers[image]
  const tierElement: React.ReactElement = <Tier width="24px" mr="8px" height="24" />
  const theme = useContext(ThemeContext)
  return (
    <Box>
      {tierElement}
      <TierTitle>{title}</TierTitle>
      <TierDetails>
        <div>
          <Text fontSize="1rem">{requirement}</Text>
          <Text fontSize="0.8rem" color="textSubtle">
            Staking Requirement
          </Text>
        </div>
        <div>
          <Text fontSize="1rem">{nftRequirement}</Text>
          <Text fontSize="0.8rem" color="textSubtle">
            MGG NFT Holder
          </Text>
        </div>
        <div>
          <Text fontSize="1rem">{stakingLength}</Text>
          <Text fontSize="0.8rem" color="textSubtle">
            Staking Length Required
          </Text>
        </div>
        <div>
          <Text fontSize="1rem">{whitelistRequirement}</Text>
          <Text fontSize="0.8rem" color="textSubtle">
            WhiteList Requirement
          </Text>
        </div>
      </TierDetails>
      <div>
        <Text fontSize="1rem">{poolWeight}</Text>
        <Text fontSize="0.8rem" color="textSubtle">
          Pool Weight
        </Text>
      </div>
      <TierFooter>
        <Button
          as="a"
          href="https://medium.com/metagamingguild"
          fullWidth
          style={{ backgroundColor: theme.colors.MGG_active }}
        >
          Learn More
        </Button>
      </TierFooter>
    </Box>
  )
}

const InoRequirement = () => {
  const theme = useContext(ThemeContext)
  return (
    <Box>
      <TierTitle>
      <SvgIcon width={118.8} Icon={InoRequirementIcon} />
      </TierTitle>
      <TierDetails>
      <div>
        <Text fontSize="1rem">4,000 MGG</Text>
        <Text fontSize="0.8rem" color="textSubtle">
          Staking Requirement
        </Text>
      </div>
      <div>
        <Text fontSize="1rem">x2 Allocation</Text>
        <Text fontSize="0.8rem" color="textSubtle">
          MGG NFT Holder
        </Text>
      </div>
      </TierDetails>
      <TierFooter>
        <Button
          as="a"
          href="https://medium.com/metagamingguild"
          fullWidth
          style={{ backgroundColor: theme.colors.MGG_active }}
        >
          Learn More
        </Button>
      </TierFooter>
    </Box>
  )
}

const RenderRoundTwo = () => {
  const round2Icon = `${process.env.PUBLIC_URL}/images/icons/2FCFS.svg`
  // const round2IconLight = `${process.env.PUBLIC_URL}/images/icons/2FCFS_light.png`
  const theme = useContext(ThemeContext)

  return (
    <>
      <div>
        <img
          src={round2Icon}
          alt="roundtwo"
          style={{ position: 'relative', width: '102%', height: '102%', marginTop: '-2vh' }}
        />
      </div>
      <div className="row">
        <Text fontSize='1rem'>
          All unsold tokens/boxes from the first round will be sold to all Tiered participants, and there will be NO LIMIT on
          how much a tiered participant can buy!
        </Text>
        &nbsp;
        <Text fontSize='1rem'>
          {' '}
          Tiered participants will be able to buy the remaining tokens/boxes on the same page where the first round was
          conducted, and at the same time regardless of the tier.{' '}
        </Text>{' '}
        &nbsp;
        <Text fontSize='1rem'>
          {' '}
          This round will remain open until all tokens/boxes are sold. Once all tokens are sold, that signals the end of the
          IDO sale.
        </Text>{' '}
        &nbsp;
        <Text fontSize='1rem'>
          {' '}
          Once the IGO/INO sale has been concluded, the platform will prepare the tokens for release. Once the necessary
          preparations are done, participants can now proceed with claiming. Just click the Claim buttons designated for
          the first and second rounds of the sale found on the same page where the sale was conducted. Participants may
          choose to participate in the
          <StyledLink href="https://app.metagg.com/#/farms"> Liquidity Staking </StyledLink>
          options that will be launched after the sale to earn extra token rewards.
        </Text>{' '}
        &nbsp;
      </div>
    </>
  )
}

const Section: React.FC = () => {
  return (
    <>
      <PageSection direction="column">
        <BoxHeader>
          <Heading size="l">ABOUT METAGAMING PAD</Heading>
        </BoxHeader>
        <BoxContainer flexDirection="column">
          <Column>{RenderDetails()}</Column>
        </BoxContainer>
      </PageSection>
      <PageSection direction="column">
        <BoxHeader>
          <Heading size="l">INO REQUIREMENTS</Heading>
        </BoxHeader>
        <BoxContainer>
          <InoRequirement />
        </BoxContainer>
      </PageSection>
      <PageSection direction="column">
        <BoxHeader>
          <Heading size="l">IGO TIER LIST</Heading>
        </BoxHeader>
        <BoxContainer flexDirection="column">
          <TierColumns>{RenderTierSystem()}</TierColumns>
        </BoxContainer>
      </PageSection>
      <PageSection direction="column">
        <BoxHeader>
          <Heading size="l">ROUND 2 - FCFS ROUND </Heading>
        </BoxHeader>
        <BoxContainer flexDirection="column">
          <TwoColumn>{RenderRoundTwo()}</TwoColumn>
        </BoxContainer>
      </PageSection>
    </>
  )
}

export default Section
