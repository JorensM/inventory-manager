import '@testing-library/jest-dom';
import { act, render, screen, waitFor } from '@testing-library/react'
import BackButton from '@/components/buttons/BackButton'

import userEvent from '@testing-library/user-event';
import { BrowserRouter, Link, Route, RouterProvider, createBrowserRouter } from 'react-router-dom';

// react-router-dom uses Remix router and since
// Remix router is failing for some reason around the Request obj
global["Request"] = jest.fn().mockImplementation(() => ({
    signal: {
      removeEventListener: () => {},
      addEventListener: () => {},
    },
  }));

describe('BackButton', () => {
    const testRouter = createBrowserRouter([
        {
            path: '/',
            element: <div><p>1</p><Link to='/other_route'>Change route</Link><BackButton/></div>
        },
        {
            path: '/other_route',
            element: <div><p>2</p><BackButton/></div>
        }
    ])

    it('Should say "Back"', async () => {
        jest.mock('react-router-dom', () => {
            const original = jest.requireActual('react-router-dom');

            return {
                __esModule: true,
                ...original,
                useNavigate: () => () => null
            }
        })
        render(
            <RouterProvider router={testRouter}/>
        );

        const button = screen.getByText('Back');

        expect(button.innerHTML).toEqual('Back');
    })

    it('Should redirect to previous route on click', async () => {

        

        render(
            <RouterProvider router={testRouter} />
        );

        expect(location.pathname).toEqual('/')

        const user = userEvent.setup();

        const linkTo2 = screen.getByText('Change route');

        //await act(async () => {
            await user.click(linkTo2);
        //})

        const backButton = screen.getByText('Back');

        //await act(async () => {
            await user.click(backButton);
        //})

        await waitFor(() => expect(location.pathname).toEqual('/'));
    })
})