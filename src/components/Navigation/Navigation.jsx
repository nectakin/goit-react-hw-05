import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

import styles from './Navigation.module.css';

const navLinkClassName = ({ isActive }) => clsx(styles.navLink, isActive && styles.active);

const Navigation = () => {
  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.navList}>
          <li>
            <NavLink to="/" className={navLinkClassName}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/movies" className={navLinkClassName}>
              Movies
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Navigation;