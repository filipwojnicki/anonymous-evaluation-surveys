import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import App from './app/app';
import client from './lib/client';
import { ConfirmationProvider } from './app/components/ConfirmationDialog';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <ConfirmationProvider>
          <App />
        </ConfirmationProvider>
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>
);
