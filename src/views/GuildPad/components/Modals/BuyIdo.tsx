import React, { useState } from 'react';
import { Guildpad } from 'state/types';
import { Modal, Text, Button, Heading, Flex } from '@metagg/mgg-uikit';
import CurrencyInputPanel from 'components/CurrencyInputPanel';
import Logo from 'components/Launchpad/Logo'
import { ActionSection, ContentContainer, HeaderSection, SwapSection, AllocSection } from './styled';


interface ModalProps {
    onDismiss?: () => void;
    guildpad?: Guildpad
}

const ModalComponent:React.FC<ModalProps> = ({onDismiss, guildpad}) => {
    const [ input, setInput ] = useState<string>('');
    const [ output, setOutput ] = useState<string>('');
    
    // Input 
    const handleUserInput = (value) => {
        setInput(value);
    }

    const handleMaxInput = () => {
        const maxInput = '10'; // temporary
        // fn(maxInput.toExact());
        setInput(maxInput)
    };

    // Output 
    const handleUserOuput= (value) => {
        setOutput(value);
    }

    const handleMaxOuput = () => {
        const maxInput = '10'; // temporary
        // fn(maxInput.toExact());
        setOutput(maxInput)
    };

    return (
        <Modal onDismiss={onDismiss} title="">
            <ContentContainer>
                <HeaderSection flexDirection='column'>
                <Heading size="l">Swap Coins</Heading>
                <Text color="textSubtle" fontSize='10px'>Max. Allocation is 0.001 MGG </Text>
                </HeaderSection>
                <SwapSection>
                    <CurrencyInputPanel
                     label='From'
                     id='swap-input'
                     value={input}
                     onUserInput={handleUserInput}
                     currency={guildpad.buyingCoin}
                     showMaxButton
                     onMax={handleMaxInput}
                     remainingSupply='no limit'
                    />
                    <CurrencyInputPanel
                     label='To'
                     id='swap-output'
                     value={output}
                     onUserInput={handleUserOuput}
                     currency={guildpad.sellingCoin}
                     showMaxButton
                     onMax={handleMaxOuput}
                     remainingSupply='no limit'
                    />
                    <Text>Price: {`0.000001 ${guildpad.sellingCoin.symbol} per ${guildpad.buyingCoin.symbol}`}</Text>
                </SwapSection>
                <ActionSection>
                    <Button disabled={input === '' || output === ''} fullWidth>SWAP</Button>
                </ActionSection>
                <AllocSection>
                <Text fontSize='14px'>My Allocation</Text>
                <Flex alignItems='center'>
                    <Logo primaryToken={guildpad.sellingCoin} padding="0px" />
                    <Text>0.1 {guildpad.sellingCoin.symbol}</Text>
                </Flex>
                </AllocSection>
            </ContentContainer>
        </Modal>
    )
}

export default ModalComponent;