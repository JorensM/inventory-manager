import '@/misc/initDefaults'

// Core
import { useEffect, useRef, useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

// Styles
import './style.css';

// Types
import { User } from './types/User';
import { Platforms } from './types/Platform';

// Classes
import ReverbManager from './classes/PlatformManager/ReverbManager';
import ListingManager from './classes/ListingManager';

// State
import PlatformsContext from './state/PlatformsContext';
import AuthContext from './state/AuthContext';

// Util
import storage from './util/storage';

// Constants
import { IS_DEV } from './constants/env';
import storage_keys from './constants/storage_keys';
import { DEFAULT_SETTINGS } from './constants/defaults';

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

// Loaders
import listingPageLoader from './pages/app/listingPageLoader';
import settingsPageLoader from './pages/app/settingsPageLoader';
import platforms from './classes/PlatformManager/AllPlatforms';
import SettingsManager from './classes/SettingsManager';
import routes from './constants/routes';
import CategoriesPage from './pages/app/CategoriesPage';
import supabase from './util/supabase';

// Add custom page title to dev environment to easily differentiate between prod and dev
// tabs in browser
document.title = IS_DEV ? 'DEV: Inventory Manager' : 'Inventory Manager'

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
    element: <ListingPage />,
    loader: listingPageLoader
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
    path: routes.categories,
    element: <CategoriesPage />,
    loader: async () => {

      const { data: { user }, error: user_error } = await supabase.auth.getUser();

      if (user_error) throw user_error;

      if(!user) {
         throw new Error('User not found')
      }

      const { data: teams, error: teams_error} = await supabase.from('teams')
        .select()
        .contains('users', user.id);

      if (teams_error) throw teams_error
      // const { data: categories, error } = await supabase.from('categories')
      //   .select()
      //   .in
    }
  },
  {
    path: '/app/teams/edit',
    element: <TeamEditPage />
  },
  {
    path: '/app/settings',
    element: <SettingsPage />,
    loader: settingsPageLoader
  }
]);

function App() {

  //-- State --//
  const [ user, setUser] = useState<User | null>(null);

  //-- Refs --//
  /**
   * This ref is deprecated, should use AllListings class instead. This is
   * because we need to use the platforms classes in places where hook usage is not allowed
   */
  const platformsRef = useRef<Platforms>({ 
    reverb: new ReverbManager(null, true),
    ebay: new ReverbManager(null, true)
  });

  //-- Functions --//

  const initPlatforms = async () => {
    const settings = await SettingsManager.getSettings();

    platforms.get('reverb').setApiKey(settings.reverb_key);
  }

  //-- Effects --//

  useEffect(() => {

    //initPlatforms();
    
  }, [])

  return (
    <AuthContext.Provider value={{user, setUser}}>
      <PlatformsContext.Provider value={{platforms: platformsRef.current}}>
        <RouterProvider router={router} />
      </PlatformsContext.Provider>
    </AuthContext.Provider>
    
  )
}

export default App
