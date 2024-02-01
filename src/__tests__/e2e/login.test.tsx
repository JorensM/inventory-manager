import '@testing-library/jest-dom'

// Mocks
import '@/test/__mocks__/constants/env'

// Core
import { act, render, screen, waitFor } from "@testing-library/react"
import userEvent from '@testing-library/user-event'

// Components
import App from "../../App"

// Constants
import routes from '@/constants/routes'

// react-router-dom uses Remix router and since
// Remix router is failing for some reason around the Request obj
global["Request"] = jest.fn().mockImplementation(() => ({
    signal: {
      removeEventListener: () => {},
      addEventListener: () => {},
    },
}));

// //@ts-expect-
// global.IS_REACT_ACT_ENVIRONMENT = true

const TEST_USER = {
    email: 'test@gmail.com',
    password: 'password'
}

describe('Login flow', () => {

    // const { rerender: _rerender } = render(<App/>);

    // const rerender = () => {
    //     location.pathname = "/";
    //     _rerender(<App/>);
    // }

    const user = userEvent.setup();

    it('Should be on the landing page initially', async () => {

        render(<App/>);

        expect(location.pathname).toEqual('/');

        const heading = screen.getByText('Inventory Manager');
        const signInButton = screen.getByText('Sign in');
        const signUpButton = screen.getByText('Sign up');

        expect(heading).toBeDefined();
        expect(signInButton).toBeDefined();
        expect(signUpButton).toBeDefined();
        
    })

    /**
     * Goes from / to /login
     */
    const gotoLoginScreen = async () => {
        const signInButton = screen.getByText('Sign in');

        //await act(async () => {
            await user.click(signInButton)
        //})
    }
    
    it('Should go to ' + routes.login + ' on Sign In button click', async () => {
        render(<App/>);//rerender();

        await gotoLoginScreen();

        await waitFor(() => expect(location.pathname).toEqual(routes.login));
    })

    
    
    const signInWithCredentials = async (email: string, password: string) => {
        const emailField = screen.getByLabelText('Email');
        const passwordField = screen.getByLabelText('Password');
        const loginButton = screen.getByText('Log in', { selector: 'button' })

        //await act(async () => {
            await user.click(emailField);
            await user.keyboard(email);
            await user.click(passwordField);
            await user.keyboard(password);
            await user.click(loginButton);
        //})
    }

    test('User should receive an error message if credentials are incorrect', async () => {
        render(<App/>);//rerender();

        // await gotoLoginScreen();

        await signInWithCredentials('fake@mail.com', 'password');

        const errorMessage = screen.findByText('Error');

        expect(errorMessage).toBeDefined();
    })

    test('User should be logged in if correct credentials are provided', async () => {

        render(<App/>);//rerender();

        // await gotoLoginScreen();

        await signInWithCredentials(TEST_USER.email, TEST_USER.password);

        await waitFor(() => expect(location.pathname).toEqual(routes.dashboard));


    })
})