import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { to: '/discover', label: 'Discover' },
  { to: '/cookbook', label: 'My Cookbook' },
  { to: '/profile', label: 'Profile' },
  { to: '/settings', label: 'Settings' },
];

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="relative z-20">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl bg-white/70 px-6 py-4 shadow-book backdrop-blur border border-white/50 mt-6">
        <motion.div whileHover={{ scale: 1.05 }} className="cursor-pointer" onClick={() => navigate('/')}>
          <div className="text-2xl font-display text-espresso">
            Hearth<span className="text-terracotta">Book</span>
          </div>
          <p className="text-xs uppercase tracking-[0.3em] text-olive">Earthy recipes</p>
        </motion.div>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {isAuthenticated ? (
            navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `transition hover:text-terracotta ${isActive ? 'text-terracotta' : 'text-espresso/70'}`
                }
              >
                {item.label}
              </NavLink>
            ))
          ) : (
            <p className="text-xs uppercase tracking-[0.4em] text-espresso/50">Sign up to unlock navigation</p>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <Button variant="ghost" size="sm" onClick={() => navigate('/profile')}>
                My Profile
              </Button>
              <Button size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button size="sm" onClick={() => navigate('/signup')}>
                Join Now
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

