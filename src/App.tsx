import { useState } from 'react';

import './style.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/app/DashboardPage';
import ListingsPage from './pages/app/ListingsPage';

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
    path: '/app/dashboard',
    element: <DashboardPage />
  },
  {
    path: '/app/listings',
    element: <ListingsPage />
  }
]);

function App() {
  const [count, setCount] = useState(0)

  return (
    <RouterProvider router={router} />
  )
}

export default App
