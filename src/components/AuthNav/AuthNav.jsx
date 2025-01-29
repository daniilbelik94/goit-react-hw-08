import { NavLink } from 'react-router-dom';

import clsx from 'clsx';

import css from './AuthNav.module.css';

const AuthNav = () => {
  const navLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  return (
    <nav className={css.nav}>
      <NavLink to='/register' className={navLinkClass}>
        Sign up
      </NavLink>
      <NavLink to='/login' className={navLinkClass}>
        Sign in
      </NavLink>
    </nav>
  );
};

export default AuthNav;
