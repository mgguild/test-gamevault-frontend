import React from 'react';
import styled from 'styled-components'
import { Flex, Text } from '@metagg/mgg-uikit';
import { Facebook, Twitter, Mail, Send } from 'react-feather';

const Container = styled.div`
display: flex;
justify-content: space-between;
width: 100%;
padding: 25px;
`
const StyledDiv = styled.div`
    display: flex;
    align-items: flex-start;
    flex: 2;
    padding: 5px;
    & > * {
        margin: 10px 0px;
    }
`
const SocMeds = styled.div`
flex: 1;
display:flex;
flex-direction: column;
padding: 5px;
align-items: flex-end;
& > * {
    margin: 10px 0px;
}
`
const Icons = styled.div`
display:flex;
justify-content: space-between;
width: 50%;
`


const SocMed:React.FC<{link: string; icon: React.SVGProps<SVGSVGElement>;}> = ({link, icon}) => (
    <a href={link}>
        {icon}
    </a>
)

const Footer: React.FC = () => {
    const MGGIcon = `${process.env.PUBLIC_URL}/MGG.png`;
    return (
        <Container>
            <StyledDiv>
                <div style={{display: 'flex', alignItems: 'center'}}>
                <img src={MGGIcon} alt="mgg-icon" width="40px" style={{margin: '0px 10px'}}/>
                <Text>Meta Gaming Guild</Text>
                </div>
            </StyledDiv>
            <SocMeds>
                <Icons>
                <SocMed icon={<Facebook fill='#ffff' />} link="#"/> 
                <SocMed icon={<Twitter fill='#ffff' />} link="#"/> 
                <SocMed icon={<Send fill='#ffff' />} link="#"/> 
                <SocMed icon={<Mail fill='#ffff' />} link="#"/> 
                </Icons>
                <div style={{width: '50%', wordSpacing: '6.5px', letterSpacing: '1px', textAlign: 'right'}}>
                <Text>&copy; Meta Gaming Guild 2022</Text>
                </div>
            </SocMeds>
        </Container>
    )
}

export default Footer;