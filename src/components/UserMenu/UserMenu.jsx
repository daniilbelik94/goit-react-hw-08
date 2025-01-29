import { useDispatch, useSelector } from 'react-redux';

import { selectAuthUserData } from '../../redux/auth/selectors';
import { apiLogOutUser } from '../../redux/auth/operations';

import css from './UserMenu.module.css';

const UserMenu = () => {
  const userData = useSelector(selectAuthUserData);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(apiLogOutUser());
  };

  return (
    <div className={css.wrapper}>
      <span>Hello, {userData.name}</span>
      <button className={css.btn} type='button' onClick={handleLogOut}>
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
