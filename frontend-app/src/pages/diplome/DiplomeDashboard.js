// src/pages/diplome/DiplomeDashboard.js
import React from 'react';
import { useKeycloak } from '@react-keycloak/web';
import './DiplomeDashboard.css'; // On créera ce fichier juste après

const DiplomeDashboard = () => {
    const { keycloak } = useKeycloak();
    
    // On récupère les informations de l'utilisateur depuis le token
    const userName = keycloak.tokenParsed?.given_name || 'Diplômé';
    const userInitial = userName.charAt(0).toUpperCase();

    // -- LOGIQUE FONCTIONNELLE --
    const handleLogout = () => {
        keycloak.logout({ redirectUri: 'http://localhost:3000' });
    };

    // -- LOGIQUE FIGURANTE (pour plus tard) --
    const handleNavigation = (page) => {
        console.log(`Navigation vers : ${page}`);
        // TODO: Implémenter la navigation avec React Router
    };

    return (
        <div className="diplome-container">
            {/* === Barre de Navigation === */}
            <nav className="main-nav">
                <div className="nav-left">
                    <div className="logo">ISI Connect</div>
                    <div className="nav-items">
                        {/* TODO: Ces boutons sont des figurants */}
                        <div className="nav-item active" onClick={() => handleNavigation('dashboard')}>Tableau de bord</div>
                        <div className="nav-item" onClick={() => handleNavigation('profile')}>Mon Profil</div>
                        <div className="nav-item" onClick={() => handleNavigation('jobs')}>Offres d'emploi</div>
                        <div className="nav-item" onClick={() => handleNavigation('alumni')}>Portail Alumni</div>
                    </div>
                </div>
                <div className="nav-right">
                    <div className="notification-icon">
                        🔔
                        <div className="notification-badge">3</div>
                    </div>
                    <div className="user-profile">
                        <div className="user-avatar">{userInitial}</div>
                        <div className="user-info">
                            <div className="user-name">{keycloak.tokenParsed?.name}</div>
                            <div className="user-status">En recherche</div>
                        </div>
                        {/* Le bouton de déconnexion est fonctionnel */}
                        <button onClick={handleLogout} className="logout-btn">Se déconnecter</button>
                    </div>
                </div>
            </nav>

            {/* === Contenu de la Page === */}
            <main className="page-content-diplome">
                <div className="welcome-section">
                    <h1 className="welcome-title">Bonjour, {userName} !</h1>
                </div>
                {/* TODO: La bannière est une figurante */}
                <div className="alert-banner">
                    <span>🔔 Une nouvelle enquête de l'école est disponible.</span>
                    <button className="alert-btn">Répondre maintenant</button>
                </div>
                <div className="dashboard-grid">
                    <div className="dashboard-card">
                        <div className="card-header">Mes Candidatures Récentes</div>
                        <div className="card-content">
                            {/* TODO: Les données sont des figurants */}
                            <p>Développeur React - Vue par le recruteur</p>
                        </div>
                    </div>
                    <div className="dashboard-card">
                        <div className="card-header">Offres Recommandées</div>
                        <div className="card-content">
                            {/* TODO: Les données sont des figurants */}
                            <p>Développeur Full-Stack - StartupTech</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DiplomeDashboard;