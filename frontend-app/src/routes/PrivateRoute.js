// src/routes/PrivateRoute.js
import { useKeycloak } from '@react-keycloak/web';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, roles }) => {
    const { keycloak, initialized } = useKeycloak();

    if (!initialized) {
        return <div>Chargement...</div>;
    }

    // 1. Vérifie si l'utilisateur est connecté
    if (!keycloak.authenticated) {
        keycloak.login();
        return null;
    }

    // 2. Vérifie si l'utilisateur a au moins un des rôles requis
    const hasRequiredRole = roles.some(role => keycloak.hasRealmRole(role));

    if (!hasRequiredRole) {
        // Redirige vers la page "Non Autorisé" si l'utilisateur n'a pas le bon rôle
        return <Navigate to="/unauthorized" />;
    }

    // 3. Si tout est bon, affiche la page
    return children;
};

export default PrivateRoute;