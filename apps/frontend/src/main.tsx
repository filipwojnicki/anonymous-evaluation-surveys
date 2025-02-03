import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { I18nextProvider } from 'react-i18next';
import App from './app/app';
import client from './lib/client';
import { ConfirmationProvider } from './app/components/ConfirmationDialog';
import i18n from './lib/i18n';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <ConfirmationProvider>
            <App />
          </ConfirmationProvider>
        </BrowserRouter>
      </ApolloProvider>
    </I18nextProvider>
  </StrictMode>
);
