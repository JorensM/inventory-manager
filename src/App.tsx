import { useState } from 'react';

import './style.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/app/DashboardPage';
import ListingsPage from './pages/app/ListingsPage';
import AuthContext from './state/AuthContext';
import { User } from './types/User';
import ListingEditPage from './pages/app/ListingEditPage';
import ListingPage from './pages/app/ListingPage';
import SignupPage from './pages/SignupPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/signup',
    element: <SignupPage />
  },
  {
    path: '/app/dashboard',
    element: <DashboardPage />
  },
  {
    path: '/app/listings',
    element: <ListingsPage />
  },
  {
    path: '/app/listings/:listing_id',
    element: <ListingPage />
  },
  {
    path: '/app/listings/edit',
    element: <ListingEditPage />
  },
  {
    path: '/app/listings/edit/:listing_id',
    element: <ListingEditPage />
  }
]);

function App() {
  const [ user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{user, setUser}}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
    
  )
}

export default App
