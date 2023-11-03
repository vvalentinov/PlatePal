import styles from './Navigation.module.css';

// Bootstrap components
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

import { NavLink, Link } from 'react-router-dom';

import * as paths from '../../constants/pathNames';

import { AuthContext } from '../../contexts/AuthContext';

import { useContext, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const Navigation = () => {
    const { username, isAuthenticated, isAdmin } = useContext(AuthContext);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Navbar collapseOnSelect expand="lg" className={styles.navbar}>
            <Container>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" className={styles.navbarToggler}>
                    <FontAwesomeIcon icon={faBars} className={styles.toggle} />
                </Navbar.Toggle>
                <Navbar.Collapse id="responsive-navbar-nav" className={styles.collapse} >
                    <Nav className="fs-5">
                        <img className={styles.logoImg} src="/logo.png" alt="Logo image..." />
                        <NavLink
                            className={({ isActive }) => isActive ? styles.activeLink : styles.link}
                            to={paths.homePath}>
                            PlatePal
                        </NavLink>
                        {isAuthenticated && (
                            <NavLink
                                className={({ isActive }) => isActive ? styles.activeLink : styles.link}
                                to={paths.recipeCreatePath}>
                                Create Recipe
                            </NavLink>
                        )}
                        <NavLink
                            className={({ isActive }) => isActive ? styles.activeLink : styles.link}
                            to={paths.categoriesListPath}>
                            Categories
                        </NavLink>
                        {isAdmin && (
                            <NavLink
                                className={({ isActive }) => isActive ? styles.activeLink : styles.link}
                                to={paths.createCategoryPath}>
                                Create Category
                            </NavLink>
                        )}
                    </Nav>
                    {/* For Logged In Users */}
                    {isAuthenticated && (
                        <>
                            <Nav className="fs-4">
                                <Navbar.Text bsPrefix={styles.navbarText}>
                                    Logged in as: <Link onClick={handleShow} className={styles.link}>{username}</Link>
                                </Navbar.Text>
                                <Button bsPrefix={styles.logoutButton} className="px-3 py-1">
                                    <Link to={paths.logoutPath}>
                                        Logout<FontAwesomeIcon icon={faRightFromBracket} className="ms-1" />
                                    </Link>
                                </Button>
                            </Nav>
                            <Offcanvas placement='end' show={show} onHide={handleClose}>
                                <Offcanvas.Header closeButton>
                                    <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                                </Offcanvas.Header>
                                <Offcanvas.Body>
                                    Some text as placeholder. In real life you can have the elements you
                                    have chosen. Like, text, images, lists, etc.
                                </Offcanvas.Body>
                            </Offcanvas>
                        </>
                    )}
                    {/* For Guests */}
                    {!isAuthenticated && (
                        <Nav className="fs-4">
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