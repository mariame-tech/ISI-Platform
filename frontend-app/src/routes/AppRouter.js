// src/routes/AppRouter.js
import { BrowserRouter, Route, Routes } from 'react-router-dom';


import PublicLayout from '../components/layout/PublicLayout';

import HomePage from '../pages/public/HomePage';
import RegisterPage from '../pages/public/RegisterPage';
import DiplomeDashboard from '../pages/diplome/DiplomeDashboard';
import RecruteurDashboard from '../pages/recruteur/RecruteurDashboard';
import AdminDashboard from '../pages/admin/AdminDashboard';
import UnauthorizedPage from '../pages/utility/UnauthorizedPage';
import PrivateRoute from './PrivateRoute';
import LoginRedirector from './LoginRedirector';
import NotFoundPage from '../pages/utility/NotFoundPage';


const AppRouter = () => {
  return (
    <BrowserRouter>

      <LoginRedirector />

      <Routes>
        {/* --- GROUPE DE ROUTES PUBLIQUES --- */}
        {/*
          "Pour toutes les routes définies à l'intérieur de cette balise, utilise d'abord le composant <PublicLayout /> comme gabarit".
          C'est ce PublicLayout qui contient la barre de navigation simple et la balise <main>.
        */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* --- GROUPE DE ROUTES PRIVÉES (DASHBOARDS) --- */}
        {/*
          Chaque composant de Dashboard est responsable de sa propre mise en page complète,
          y compris sa propre barre de navigation.
        */}
        <Route
          path="/dashboard/diplome"
          element={<PrivateRoute roles={['DIPLOME']}><DiplomeDashboard /></PrivateRoute>}
        />
        <Route
          path="/dashboard/recruteur"
          element={<PrivateRoute roles={['RECRUTEUR']}><RecruteurDashboard /></PrivateRoute>}
        />
        <Route
          path="/dashboard/admin"
          element={<PrivateRoute roles={['admin']}><AdminDashboard /></PrivateRoute>}
        />

        {/* --- ROUTES UTILITAIRES --- */}
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="/home" element={<HomePage />} />

        {/*
          ROUTE CATCH-ALL (404)
          Cette route doit TOUJOURS être la dernière.
          Le path="*" intercepte toutes les URLs qui n'ont pas correspondu
          aux routes définies ci-dessus.
        */}
        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;