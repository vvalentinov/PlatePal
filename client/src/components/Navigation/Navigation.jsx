import styles from './Navigation.module.css';

import Logo from '../Logo/Logo';

// Bootstrap components
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { NavLink, Link } from 'react-router-dom';

import * as paths from '../../constants/pathNames';

import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';

const Navigation = () => {
    const { username, isAuthenticated } = useContext(AuthContext);

    return (
        <Navbar collapseOnSelect expand="lg" className={`py-2 fs-4 ${styles.navbar}`}>
            <Container>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" className="custom-toggler" />
                <Navbar.Collapse id="responsive-navbar-nav" >
                    <Nav className={styles.navbarNav}>
                        <Logo />
                        <NavLink
                            className={({ isActive }) => isActive ? styles.activeLink : ''}
                            to={paths.homePath}>
                            PlatePal
                        </NavLink>
                    </Nav>
                    {/* For Logged In Users */}
                    {isAuthenticated && (
                        <Nav>
                            <Navbar.Text className="text-white">
                                Logged in as: <a href="#login">{username}</a>
                            </Navbar.Text>
                            <Link to={paths.logoutPath} className={`btn btn-lg border border-3 ${styles.logoutButton}`}>
                                Logout
                            </Link>
                        </Nav>
                    )}
                    {/* For Guests */}
                    {!isAuthenticated && (
                        <Nav>
                            <NavLink
                                className={({ isActive }) => isActive ? styles.activeLink : ''}
                                to={paths.loginPath}>
                                Login
                            </NavLink>
                            <NavLink
                                className={({ isActive }) => isActive ? styles.activeLink : ''}
                                to={paths.registerPath}>
                                Register
                            </NavLink>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;