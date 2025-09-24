// src/pages/recruteur/RecruteurDashboard.js
import React from 'react';
import { useKeycloak } from '@react-keycloak/web';
import './RecruteurDashboard.css';

const RecruteurDashboard = () => {
    const { keycloak } = useKeycloak();

    // -- LOGIQUE FONCTIONNELLE --
    const handleLogout = () => {
        keycloak.logout({ redirectUri: 'http://localhost:3000' });
    };

    return (
        <div className="recruteur-container">
            {/* Le logout est fonctionnel, le reste est figurant */}
            <button onClick={handleLogout} className="logout-btn-recruteur">Se déconnecter</button>
            <div className="page-tabs">
                <div className="tab active">Tableau de bord</div>
                <div className="tab">Gestion Diplômés</div>
                <div className="tab">Gestion Entreprises</div>
                <div className="tab">Gestion Offres</div>
            </div>
            <main className="page-content-recruteur active">
                <div className="dashboard-header">
                    <h1 className="dashboard-title">Tableau de bord Recruteur</h1>
                </div>
                <div className="kpi-cards">
                    <div className="kpi-card">
                        <div className="kpi-number">84%</div>
                        <div className="kpi-label">Taux d'insertion</div>
                    </div>
                    <div className="kpi-card">
                        <div className="kpi-number">156</div>
                        <div className="kpi-label">Nouveaux diplômés</div>
                    </div>
                    <div className="kpi-card">
                        <div className="kpi-number">43</div>
                        <div className="kpi-label">Offres actives</div>
                    </div>
                    <div className="kpi-card">
                        <div className="kpi-number">127</div>
                        <div className="kpi-label">Entreprises</div>
                    </div>
                </div>
                {/* TODO: La suite de la page est figurante */}
            </main>
        </div>
    );
};

export default RecruteurDashboard;