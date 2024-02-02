// Core
import { useRef, useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

// Styles
import './style.css';

// Types
import { User } from './types/User';
import { Platforms } from './types/Platform';

// Classes
import ReverbManager from './classes/PlatformManager/ReverbManager';

// State
import PlatformsContext from './state/PlatformsContext';
import AuthContext from './state/AuthContext';

// Util
import storage from './util/storage';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/app/DashboardPage';
import ListingsPage from './pages/app/ListingsPage';
import TeamEditPage from './pages/app/TeamEditPage';
import SignupPage from './pages/SignupPage';
import ListingEditPage from './pages/app/ListingEditPage';
import ListingPage from './pages/app/ListingPage';
import SettingsPage from './pages/app/SettingsPage';

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
  },
  {
    path: '/app/teams/edit',
    element: <TeamEditPage />
  },
  {
    path: '/app/settings',
    element: <SettingsPage />
  }
]);

function App() {
  const [ user, setUser] = useState<User | null>(null);

  const platformsRef = useRef<Platforms>({
    reverb: new ReverbManager(storage.get('settings').reverb_key, true),
    ebay: new ReverbManager(storage.get('settings').reverb_key, true)
  });

  return (
    <AuthContext.Provider value={{user, setUser}}>
      <PlatformsContext.Provider value={{platforms: platformsRef.current}}>
        <RouterProvider router={router} />
      </PlatformsContext.Provider>
    </AuthContext.Provider>
    
  )
}

export default App
