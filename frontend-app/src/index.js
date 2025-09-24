import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from './config/keycloak';

// Object d'options pour l'initialisation de Keycloak
const initOptions = {
  onLoad: 'check-sso', // Vérifie si l'utilisateur est déjà connecté en silence
  silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
  pkceMethod: 'S256',
};


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ReactKeycloakProvider authClient={keycloak} initOptions={initOptions}>
    <App />
  </ReactKeycloakProvider>
);