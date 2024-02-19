import '@/misc/initDefaults'

// Core
import { useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

// Styles
import './style.css';

// Types
import { User } from './types/User';
import { Platforms } from './types/Platform';

// Classes
import ReverbManager from './classes/PlatformManager/ReverbManager';
import ListingManager from './classes/ListingManager';
import platforms from './classes/PlatformManager/AllPlatforms';
import SettingsManager from './classes/SettingsManager';
import user from './classes/UserManager';

// State
import PlatformsContext from './state/PlatformsContext';
import AuthContext from './state/AuthContext';

// Util
import storage from './util/storage';
import supabase from './util/supabase';

// Constants
import { IS_DEV } from './constants/env';
import storage_keys from './constants/storage_keys';
import { DEFAULT_SETTINGS } from './constants/defaults';
import routes from './constants/routes';

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
import listingPageLoader from './pages/app/listingPageLoader';
import settingsPageLoader from './pages/app/settingsPageLoader';
import CategoriesPage from './pages/app/CategoriesPage';
import CategoryEditPage from './pages/app/CategoryEditPage';

// Loaders
import resourceLoader from './misc/resourceLoader';
import CategoryPage from './pages/app/CategoryPage';

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
    loader: resourceLoader(['listing', 'platform_listings'])
  },
  {
    path: '/app/listings/edit',
    element: <ListingEditPage />
  },
  {
    path: '/app/listings/edit/:listing_id',
    element: <ListingEditPage />,
    loader: resourceLoader(['listing', 'categories'])
  },
  {
    path: routes.categories,
    element: <CategoriesPage />,
    loader: async () => {

      await user.revalidate();
      const user_team = user.getTeam();

      if (!user_team) throw new Error("User doesn't have a team")
      
      const { data: categories, error } = await supabase.from('categories')
        .select()
        .in('team_id', [ user_team.id ])

      if (error) throw error;

      return { categories }
    }
  },
  {
    path: routes.new_category,
    element: <CategoryEditPage />,
    loader: resourceLoader([], ['category'])
  },
  {
    path: routes.edit_category(':category_id'),
    element: <CategoryEditPage />,
    loader: resourceLoader(['category'])
  },
  {
    path: routes.category(':category_id'),
    element: <CategoryPage />,
    loader: resourceLoader(['category'])
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
  // const platformsRef = useRef<Platforms>({ 
  //   reverb: new ReverbManager(null, true),
  //   ebay: new ReverbManager(null, true)
  // });

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
      {/* <PlatformsContext.Provider value={{platforms: platformsRef.current}}> */}
        <RouterProvider router={router} />
      {/* </PlatformsContext.Provider> */}
    </AuthContext.Provider>
    
  )
}

export default App
