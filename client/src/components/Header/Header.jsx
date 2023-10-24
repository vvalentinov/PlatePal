// Bootstrap components
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { NavLink } from 'react-router-dom';

import styles from './Header.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            <Navbar collapseOnSelect expand="lg" className={`py-4 fs-4 ${styles.navbar}`}>
                <Container>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" className="custom-toggler" />
                    <Navbar.Collapse id="responsive-navbar-nav" >
                        <Nav className="me-auto">
                            <NavLink
                                className={({ isActive }) => isActive ? styles.activeLink : ''}
                                to="/">
                                PlatePal
                            </NavLink>
                        </Nav>
                        <Nav>
                            <NavLink
                                className={({ isActive }) => isActive ? styles.activeLink : ''}
                                to="/login">
                                Login
                            </NavLink>
                            <NavLink
                                className={({ isActive }) => isActive ? styles.activeLink : ''}
                                to="/register">
                                Register
                            </NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header;