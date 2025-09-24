//Affiche la barre de navigation et les boutons de connexion/déconnexion
import React from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { Link, useNavigate } from 'react-router-dom';
import './Nav.css';

const Nav = () => {
  const { keycloak, initialized } = useKeycloak();
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/register');
    };

  if (!initialized) {
    return <div>Chargement...</div>;
  }

  return (
    <nav className="navbar">
      <h1>Mon Application</h1>
      <ul className="nav-links">
        <li><Link to="/">Accueil</Link></li>
      </ul>
      <div className="nav-actions">
        {!keycloak.authenticated && (
           <>
            <button type="button" className="nav-button" onClick={handleRegister}>
              S'inscrire
            </button>
          <button type="button" className="nav-button" onClick={() => keycloak.login()}>
            Se connecter
          </button>
          </>
        )}
        {keycloak.authenticated && (
          <button type="button" className="nav-button" onClick={() => keycloak.logout({ redirectUri: 'http://localhost:3000' })}>
            Se déconnecter ({keycloak.tokenParsed.preferred_username})
          </button>
        )}
      </div>
    </nav>
  );
};

export default Nav;