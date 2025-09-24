// src/pages/admin/AdminDashboard.js
import React from 'react';
import { useKeycloak } from '@react-keycloak/web';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const { keycloak } = useKeycloak();
    
    // -- LOGIQUE FONCTIONNELLE --
    const handleLogout = () => {
        keycloak.logout({ redirectUri: 'http://localhost:3000' });
    };

    return (
        <div className="admin-container">
            {/* === Barre de Navigation Admin === */}
            <nav className="main-nav-admin">
                <div className="nav-left">
                    <div className="logo-admin">ADMIN PANEL</div>
                    <div className="nav-items">
                        {/* TODO: Boutons figurants */}
                        <div className="nav-item-admin active">DASHBOARD</div>
                        <div className="nav-item-admin">UTILISATEURS</div>
                        <div className="nav-item-admin">LOGS</div>
                    </div>
                </div>
                <div className="nav-right">
                    <div className="admin-info">ADMIN: {keycloak.tokenParsed?.preferred_username}</div>
                    {/* Bouton de déconnexion fonctionnel */}
                    <button onClick={handleLogout} className="logout-btn-admin">Logout</button>
                </div>
            </nav>

            {/* === Contenu de la Page Admin === */}
            <main className="page-content-admin active">
                <h1 className="page-title-admin">TABLEAU DE BORD TECHNIQUE</h1>
                <div className="status-cards">
                    {/* TODO: Cartes figurantes */}
                    <div className="status-card">
                        <div className="status-indicator status-online">EN LIGNE ✅</div>
                        <div className="status-label">STATUT SERVEUR</div>
                    </div>
                    <div className="status-card">
                        <div className="status-indicator status-info">47</div>
                        <div className="status-label">UTILISATEURS EN LIGNE</div>
                    </div>
                    <div className="status-card">
                        <div className="status-indicator status-error">3</div>
                        <div className="status-label">ERREURS CRITIQUES (24H)</div>
                    </div>
                    <div className="status-card">
                        <div className="status-indicator status-warning">68%</div>
                        <div className="status-label">UTILISATION BDD</div>
                    </div>
                </div>
                 {/* TODO: Section figurante */}
            </main>
        </div>
    );
};

export default AdminDashboard;