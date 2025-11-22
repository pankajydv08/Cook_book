import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import AppShell from '../components/layout/AppShell';
import { PageTransition } from '../components/ui/PageTransition';
import { useAuth } from '../context/AuthContext';
import Landing from '../pages/Landing';
import Discover from '../pages/Discover';
import RecipeDetail from '../pages/RecipeDetail';
import CookMode from '../pages/CookMode';
import MyCookbook from '../pages/MyCookbook';
import AddRecipe from '../pages/AddRecipe';
import EditRecipe from '../pages/EditRecipe';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import NotFound from '../pages/NotFound';

const routeConfig = [
  { path: '/', element: <Landing /> },
  { path: '/discover', element: <Discover />, requiresAuth: true },
  { path: '/recipe/:id', element: <RecipeDetail />, requiresAuth: true },
  { path: '/cook/:id', element: <CookMode />, minimal: true, requiresAuth: true },
  { path: '/cookbook', element: <MyCookbook />, requiresAuth: true },
  { path: '/recipe/new', element: <AddRecipe />, requiresAuth: true },
  { path: '/recipe/:id/edit', element: <EditRecipe />, requiresAuth: true },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  { path: '/profile', element: <Profile />, requiresAuth: true },
  { path: '/settings', element: <Settings />, requiresAuth: true },
  { path: '*', element: <NotFound /> },
];

const RequireAuth = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/signup" state={{ from: location.pathname }} replace />;
  }

  return children;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {routeConfig.map(({ path, element, minimal, requiresAuth }) => (
          <Route
            key={path}
            path={path}
            element={
              <AppShell minimal={minimal}>
                <PageTransition>{requiresAuth ? <RequireAuth>{element}</RequireAuth> : element}</PageTransition>
              </AppShell>
            }
          />
        ))}
      </Routes>
    </AnimatePresence>
  );
};

const AppRouter = () => (
  <BrowserRouter>
    <AnimatedRoutes />
  </BrowserRouter>
);

export default AppRouter;

