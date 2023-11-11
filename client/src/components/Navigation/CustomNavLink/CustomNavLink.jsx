import { NavLink, useLocation } from 'react-router-dom';

import styles from '../Navigation.module.css';

const CustomNavLink = ({ to, children }) => {
    const location = useLocation();

    const activeRoutes = [
        '/recipe/user-recipes/all',
        '/recipe/user-recipes/approved',
        '/recipe/user-recipes/unapproved'];

    const isActive = activeRoutes.some(route => location.pathname === route);

    return (
        <NavLink to={to} className={isActive ? styles.activeLink : styles.link}>
            {children}
        </NavLink>
    );
};

export default CustomNavLink;