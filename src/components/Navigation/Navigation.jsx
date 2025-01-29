import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import clsx from 'clsx';

import { selectAuthIsLoggedIn } from '../../redux/auth/selectors';

import css from './Navigation.module.css';

const Navigation = () => {
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);

  const navLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  return (
    <nav className={css.nav}>
      <NavLink to='/' className={navLinkClass}>
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink to='/contacts' className={navLinkClass}>
          Contacts
        </NavLink>
      )}
    </nav>
  );
};

export default Navigation;
