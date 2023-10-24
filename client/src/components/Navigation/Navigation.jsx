import styles from './Navigation.module.css';

// Bootstrap components
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { NavLink } from 'react-router-dom';

import * as paths from '../../constants/pathNames';

const Navigation = () => {
    return (
        <Navbar collapseOnSelect expand="lg" className={`py-2 fs-4 ${styles.navbar}`}>
            <Container>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" className="custom-toggler" />
                <Navbar.Collapse id="responsive-navbar-nav" >
                    <Nav className={styles.navbarNav}>
                        <img className="logoImg" src="/logo.png" alt="" />
                        <NavLink
                            className={({ isActive }) => isActive ? styles.activeLink : ''}
                            to={paths.homePath}>
                            PlatePal
                        </NavLink>
                    </Nav>
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
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;