import React, { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Spacer,
  Flex,
  Button,
  Box,
  Text,
  VStack,
  Grid,
  Input,
  theme,
} from '@chakra-ui/react';

import { useEtherBalance, useEthers, useSendTransaction } from '@usedapp/core';
import { formatEther } from '@ethersproject/units';
import { utils } from 'ethers';

function App() {
  const { activateBrowserWallet, account } = useEthers();
  const etherBalance = useEtherBalance(account);
  const [receiverAddress, setReceiverAddress] = useState('');
  const [amountToSend, setAmountToSend] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const { sendTransaction, state } = useSendTransaction();

  function trimAccount(accountString) {
    return `${accountString.slice(0, 6)}...${accountString.slice(
      accountString.length - 4,
      accountString.length
    )}`;
  }

  function handleSendTransaction() {
    if (receiverAddress && amountToSend) {
      setDisabled(true);
      sendTransaction({
        to: receiverAddress,
        value: utils.parseEther(amountToSend),
      });
    }
  }

  useEffect(() => {
    if (state.status !== 'Mining') {
      setDisabled(true);
      setAmountToSend(0);
      setReceiverAddress('');
    }
  }, [state]);

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Flex justifyItems="flex-end" p={2}>
          <Spacer />
          {/* configure our button  */}
          <Button onClick={() => activateBrowserWallet()}>
            {account ? trimAccount(account) : `Connect`}
          </Button>
        </Flex>
        <Grid minH="100vh" p={3}>
          <VStack spacing={8}>
            <Text>Connecting to Moonriver with useDapp</Text>
            <Text>
              MOVR balance: {etherBalance && formatEther(etherBalance)}
            </Text>
            <Input
              placeholder="Receiver address"
              value={receiverAddress}
              onChange={e => setReceiverAddress(e.target.value)}
            />
            <Input
              placeholder="Amount to send"
              type="number"
              value={amountToSend}
              onChange={e => setAmountToSend(e.target.value)}
            />
            <Button onClick={handleSendTransaction} disabled={disabled}>
              Send
            </Button>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
