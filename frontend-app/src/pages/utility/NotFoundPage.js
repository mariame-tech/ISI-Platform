// src/pages/utility/NotFoundPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css';

const NotFoundPage = () => {
    return (
        <div className="notfound-container">
            <h1 className="notfound-title">404</h1>
            <p className="notfound-subtitle">Oups ! Page Introuvable</p>
            <p className="notfound-text">
                La page que vous recherchez semble ne pas exister.
            </p>
            <Link to="/" className="notfound-link">
                Retour à l'accueil
            </Link>
        </div>
    );
};

export default NotFoundPage;