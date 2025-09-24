// src/pages/utility/UnauthorizedPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './UnauthorizedPage.css';

const UnauthorizedPage = () => {
    return (
        <div className="unauthorized-container">
            <div className="unauthorized-icon">🚫</div>
            <h1 className="unauthorized-title">Accès Interdit</h1>
            <p className="unauthorized-text">
                Vous n'avez pas les permissions nécessaires pour accéder à cette page.
                Veuillez contacter un administrateur si vous pensez qu'il s'agit d'une erreur.
            </p>
            <Link to="/" className="unauthorized-link">
                Retour à l'accueil
            </Link>
        </div>
    );
};

export default UnauthorizedPage;