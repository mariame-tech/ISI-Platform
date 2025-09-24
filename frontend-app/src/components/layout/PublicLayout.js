// src/components/layout/PublicLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './Nav';

const PublicLayout = () => {
  return (
    <>
      <Nav />
      <main className="main-content">
        {/* L'Outlet est un espace réservé où React affichera la page enfant (ex: HomePage) */}
        <Outlet />
      </main>
    </>
  );
};

export default PublicLayout;