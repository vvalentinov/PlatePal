// Bootstrap components
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import styles from './Header.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            <Navbar collapseOnSelect expand="lg" className={`py-3 fs-4 ${styles.navbar}`}>
                <Container>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" >
                        <Nav className="me-auto">
                            <Nav.Link>
                                PlatePal
                            </Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link>
                                Login
                            </Nav.Link>
                            <Nav.Link>
                                Register
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header;