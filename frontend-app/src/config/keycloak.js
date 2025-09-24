//Ce fichier initialise la connexion à Keycloak
import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:8180',
  realm: 'ISI-Platform',
  clientId: 'frontend-app',
});

export default keycloak;