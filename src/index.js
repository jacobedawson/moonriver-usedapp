import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ChainId, DAppProvider } from '@usedapp/core';

const config = {
  readOnlyChainId: ChainId.Moonriver,
};

ReactDOM.render(
  <StrictMode>
    <DAppProvider config={config}>
      <App />
    </DAppProvider>
  </StrictMode>,
  document.getElementById('root')
);
