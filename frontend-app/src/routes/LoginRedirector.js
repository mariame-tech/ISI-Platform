// src/routes/LoginRedirector.js
import { useEffect } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginRedirector = () => {
    const { keycloak, initialized } = useKeycloak();
    const navigate = useNavigate();
    const location = useLocation();

    // On utilise un `useEffect` pour surveiller le changement d'état de l'authentification
    useEffect(() => {
        // Dès que l'utilisateur est authentifié, on agit.
        // La redirection ne se fait que si l'utilisateur est connecté ET qu'il se trouve sur la page d'accueil.
        if (initialized && keycloak.authenticated && location.pathname === '/') {
            const roles = keycloak.tokenParsed.realm_access.roles;

            // On vérifie les rôles dans l'ordre de priorité
            if (roles.includes('admin')) {
                navigate('/dashboard/admin');
            } else if (roles.includes('RECRUTEUR')) {
                navigate('/dashboard/recruteur');
            } else if (roles.includes('DIPLOME')) {
                navigate('/dashboard/diplome');
            } else {
                // Si l'utilisateur n'a aucun rôle spécifique, on le met sur un dashboard par défaut.
                // Tu peux changer cette URL de secours si besoin.
                navigate('/dashboard'); 
            }
        }

    }, [initialized, keycloak.authenticated, navigate, keycloak.tokenParsed, location.pathname]);

    return null; // Ce composant n'affiche rien, il ne fait que rediriger.
};

export default LoginRedirector;