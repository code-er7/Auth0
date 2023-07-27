import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Auth0Provider
      domain="code-er7.us.auth0.com"
      clientId="Hi0XRQwJUdfDHRuUN1EZbdlhQiUB3a5B"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <App /> 
    </Auth0Provider>
);

