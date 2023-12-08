import { fireEvent, render, screen } from '@testing-library/react';
import { AuthContext } from '../../contexts/AuthContext';
import Header from './Header';
import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom';
import { beforeEach, describe } from 'vitest';

import { homePath, categoriesListPath, loginPath, registerPath, userProfilePath } from '../../constants/pathNames';

describe('Header component tests', () => {
    test('Render header component', () => {
        render(
            <Router>
                <AuthContext.Provider value={{ username: 'Valentin', isAuthenticated: true }}>
                    <Header />
                </AuthContext.Provider>
            </Router>
        );
    });

    test('Header should have four links when user is authenticated', () => {
        render(
            <Router>
                <AuthContext.Provider value={{ username: 'Valentin', isAuthenticated: true }}>
                    <Header />
                </AuthContext.Provider>
            </Router>
        );

        const platePalLink = screen.getByText(/PlatePal/i);
        const categoriesLink = screen.getByText(/categories/i);
        const spoonacularAPILink = screen.getByText(/spoonacular api/i);
        const profileLink = screen.getByText(/valentin/i);

        expect(platePalLink).toBeInTheDocument();
        expect(categoriesLink).toBeInTheDocument();
        expect(spoonacularAPILink).toBeInTheDocument();
        expect(profileLink).toBeInTheDocument();
    });

    test('Header should have four links when user is not logged in', () => {
        render(
            <Router>
                <AuthContext.Provider value={{ username: null, isAuthenticated: false }}>
                    <Header />
                </AuthContext.Provider>
            </Router>
        );

        const platePalLink = screen.getByText(/PlatePal/i);
        const categoriesLink = screen.getByText(/categories/i);
        const loginLink = screen.getByText(/login/i);
        const registerLink = screen.getByText(/register/i);

        expect(platePalLink).toBeInTheDocument();
        expect(categoriesLink).toBeInTheDocument();
        expect(loginLink).toBeInTheDocument();
        expect(registerLink).toBeInTheDocument();
    });

    test('Login Image should be present in the header', () => {
        render(
            <Router>
                <AuthContext.Provider value={{ username: null, isAuthenticated: false }}>
                    <Header />
                </AuthContext.Provider>
            </Router>
        );

        const logoImage = screen.getByAltText('Logo image...');
        expect(logoImage).toBeInTheDocument();
    });

    describe('Check clicking on guest navigation links', async () => {
        beforeEach(() => {
            render(
                <Router>
                    <AuthContext.Provider value={{ username: null, isAuthenticated: false }}>
                        <Header />
                    </AuthContext.Provider>
                </Router>
            );
        });

        test('Clicking on PlatePal link navigates to the home page', async () => {
            const platePalLink = screen.getByText(/PlatePal/i);
            expect(platePalLink).toBeInTheDocument();
            fireEvent.click(platePalLink);
            expect(window.location.pathname).toBe(homePath);
        });

        test('Clicking on Categories link navigates to the categories list page', async () => {
            const categoriesLink = screen.getByText(/Categories/i);
            expect(categoriesLink).toBeInTheDocument();
            fireEvent.click(categoriesLink);
            expect(window.location.pathname).toBe(categoriesListPath);
        });

        test('Clicking on Login link navigates to the login page', async () => {
            const loginLink = screen.getByText(/Login/i);
            expect(loginLink).toBeInTheDocument();
            fireEvent.click(loginLink);
            expect(window.location.pathname).toBe(loginPath);
        });

        test('Clicking on Register link navigates to the register page', async () => {
            const registerLink = screen.getByText(/Register/i);
            expect(registerLink).toBeInTheDocument();
            fireEvent.click(registerLink);
            expect(window.location.pathname).toBe(registerPath);
        });

    });

    describe('Check clicking on authenticated user navigation links', async () => {
        beforeEach(() => {
            render(
                <Router>
                    <AuthContext.Provider value={{ username: 'Valentin', isAuthenticated: true }}>
                        <Header />
                    </AuthContext.Provider>
                </Router>
            );
        });

        test('Clicking on Spoonacular link navigates to the spoonacular page', async () => {
            const spoonacularLink = screen.getByText(/Spoonacular api/i);
            expect(spoonacularLink).toBeInTheDocument();
            fireEvent.click(spoonacularLink);
            expect(window.location.pathname).toBe('/spoonacular');
        });

        test('Clicking on Username link navigates to the user profile page', async () => {
            const usernameLink = screen.getByText(/valentin/i);
            expect(usernameLink).toBeInTheDocument();
            fireEvent.click(usernameLink);
            expect(window.location.pathname).toBe(userProfilePath);
        });
    });
});