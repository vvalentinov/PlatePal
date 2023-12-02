import styles from './Header.module.css';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

import { NavLink, Link } from 'react-router-dom';

import {
    homePath,
    categoriesListPath,
    logoutPath,
    loginPath,
    registerPath,
    userProfilePath
} from '../../constants/pathNames';

import { AuthContext } from '../../contexts/AuthContext';

import { useContext } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    const { username, isAuthenticated } = useContext(AuthContext);

    return (
        <header>
            <Navbar fixed='top' collapseOnSelect expand="lg" className={styles.navbar}>
                <Container>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" className={styles.navbarToggler}>
                        <FontAwesomeIcon icon={faBars} className={styles.toggle} />
                    </Navbar.Toggle>
                    <Navbar.Collapse id="responsive-navbar-nav" className={styles.collapse} >
                        <Nav className="fs-5">
                            <img className={styles.logoImg} src="/logo.png" alt="Logo image..." />
                            <NavLink
                                className={({ isActive }) => isActive ? styles.activeLink : styles.link}
                                to={homePath}>
                                PlatePal
                            </NavLink>
                            <NavLink
                                className={({ isActive }) => isActive ? styles.activeLink : styles.link}
                                to={categoriesListPath}>
                                Categories
                            </NavLink>
                        </Nav>
                        {isAuthenticated && (
                            <Nav className="fs-4">
                                <Navbar.Text bsPrefix={styles.navbarText}>
                                    Logged in as: <Link to={userProfilePath} className={styles.link}>{username}</Link>
                                </Navbar.Text>
                                <Button bsPrefix={styles.logoutButton} className="px-3 py-1">
                                    <Link to={logoutPath}>
                                        Logout<FontAwesomeIcon icon={faRightFromBracket} className="ms-1" />
                                    </Link>
                                </Button>
                            </Nav>
                        )}
                        {!isAuthenticated && (
                            <Nav className="fs-4">
                                <NavLink
                                    className={({ isActive }) => isActive ? styles.activeLink : styles.link}
                                    to={loginPath}>
                                    Login
                                </NavLink>
                                <NavLink
                                    className={({ isActive }) => isActive ? styles.activeLink : styles.link}
                                    to={registerPath}>
                                    Register
                                </NavLink>
                            </Nav>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;