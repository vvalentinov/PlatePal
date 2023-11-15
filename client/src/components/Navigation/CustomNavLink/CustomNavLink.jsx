import { NavLink, useLocation } from 'react-router-dom';

import styles from '../Navigation.module.css';

const CustomNavLink = ({ to, children }) => {
    const location = useLocation();

    const activeRoutes = [
        '/recipes/user-recipes/all',
        '/recipes/user-recipes/approved',
        '/recipes/user-recipes/unapproved'];

    const isActive = activeRoutes.some(route => location.pathname === route);

    return (
        <NavLink to={to} className={isActive ? styles.activeLink : styles.link}>
            {children}
        </NavLink>
    );
};

export default CustomNavLink;