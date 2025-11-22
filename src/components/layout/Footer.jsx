import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="mt-12">
      <div className="mx-auto max-w-6xl rounded-2xl border border-white/40 bg-white/70 px-6 py-8 text-sm text-espresso/70 backdrop-blur">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-display text-xl text-espresso">HearthBook</p>
            <p>Cooking, curated by earthy technologists.</p>
          </div>
          <div className="flex gap-4">
            <NavLink className="hover:text-terracotta" to="/cookbook">
              Cookbook
            </NavLink>
            <NavLink className="hover:text-terracotta" to="/discover">
              Discover
            </NavLink>
            <NavLink className="hover:text-terracotta" to="/profile">
              Profile
            </NavLink>
          </div>
        </div>
        <p className="mt-6 text-xs text-espresso/50">© {new Date().getFullYear()} HearthBook. Designed with clay + code.</p>
      </div>
    </footer>
  );
};

export default Footer;

