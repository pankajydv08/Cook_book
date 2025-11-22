import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import clsx from 'clsx';
import Navbar from './Navbar';
import Footer from './Footer';

const AppShell = ({ children, minimal = false }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-earthy-gradient text-espresso flex flex-col">
      {!minimal && <Navbar />}
      <main
        className={clsx(
          'flex-1 px-4 md:px-8 lg:px-12 py-8 md:py-12',
          minimal && 'px-0 md:px-0 lg:px-0 py-0',
        )}
      >
        {children}
      </main>
      {!minimal && <Footer />}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#2B221E',
            color: '#F7EFE8',
            borderRadius: '1rem',
          },
        }}
      />
    </div>
  );
};

export default AppShell;

