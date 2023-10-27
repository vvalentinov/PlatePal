import styles from './Navigation.module.css';

// Bootstrap components
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

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
                <Navbar.Collapse id="responsive-navbar-nav" className={styles.collapse} >
                    <Nav>
                        <img className={styles.logoImg} src="/logo.png" alt="Logo image..." />
                        <NavLink
                            className={({ isActive }) => isActive ? styles.activeLink : styles.link}
                            to={paths.homePath}>
                            PlatePal
                        </NavLink>
                    </Nav>
                    {/* For Logged In Users */}
                    {isAuthenticated && (
                        <Nav>
                            <Navbar.Text bsPrefix={styles.navbarText}>
                                Logged in as: <Link className={styles.link}>{username}</Link>
                            </Navbar.Text>
                            <Button bsPrefix={styles.logoutButton} className="px-3 py-1">
                                <Link to={paths.logoutPath}>
                                    Logout
                                </Link>
                            </Button>
                        </Nav>
                    )}
                    {/* For Guests */}
                    {!isAuthenticated && (
                        <Nav>
                            <NavLink
                                className={({ isActive }) => isActive ? styles.activeLink : styles.link}
                                to={paths.loginPath}>
                                Login
                            </NavLink>
                            <NavLink
                                className={({ isActive }) => isActive ? styles.activeLink : styles.link}
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