// src/pages/HomePage.js
import React from 'react';
import './HomePage.css';
import { useKeycloak } from '@react-keycloak/web'; 
import { Link } from 'react-router-dom'; 

const HomePage = () => {
  // On récupère l'état de Keycloak
  const { keycloak } = useKeycloak();

  return (
    <div className="home-container">
      <h2 className="home-title">Bienvenue sur la Plateforme ISI</h2>

      {/* On affiche un contenu différent si l'utilisateur est connecté ou non */}
      {keycloak.authenticated ? (
        // Contenu si l'utilisateur EST connecté
        <div>
          <p className="home-subtitle">
            Vous êtes connecté en tant que <strong>{keycloak.tokenParsed.preferred_username}</strong>.
          </p>
          <Link to="/dashboard" className="nav-button" style={{textDecoration: 'none', marginTop: '1rem'}}>
            Aller au Dashboard
          </Link>
        </div>
      ) : (
        // Contenu si l'utilisateur N'EST PAS connecté
        <p className="home-subtitle">
          Veuillez vous connecter pour accéder à votre dashboard.
        </p>
      )}
    </div>
  );
};

export default HomePage;