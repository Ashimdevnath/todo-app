import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Header';

const Layout = ({ children }) => {
  const location = useLocation();

  // Determine whether to display Navbar based on current path
  const shouldDisplayNavbar = !['/login', '/signup'].includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {shouldDisplayNavbar && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
};

export default Layout;
