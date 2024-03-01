import '@/misc/initDefaults'

// Core
import { useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

// Styles
import './style.css';

// Types
import { User } from './types/User';

// Classes
import user from './classes/UserManager';

// State
import AuthContext from './state/AuthContext';

// Util
import supabase from './util/supabase';

// Constants
import { IS_DEV } from './constants/env';
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
import settingsPageLoader from './pages/app/settingsPageLoader';
import CategoriesPage from './pages/app/CategoriesPage';
import CategoryEditPage from './pages/app/CategoryEditPage';
import CategoryPage from './pages/app/CategoryPage';

// Loaders
import resourceLoader from './misc/resourceLoader';
import ReverbCategories from './pages/app/ReverbCategories';
import reverbCategoriesPageLoader from './pages/app/reverbCategoriesPageLoader';
import { SnackbarProvider } from 'notistack';
import ebayAuthConfirmLoader from './pages/loaders/ebayAuthConfirmLoader';

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
    path: routes.reverb_categories,
    element: <ReverbCategories />,
    loader: reverbCategoriesPageLoader
  },
  {
    path: '/app/teams/edit',
    element: <TeamEditPage />
  },
  {
    path: '/app/settings',
    element: <SettingsPage />,
    loader: settingsPageLoader
  },
  {
    path: routes.auth.ebay.confirm,
    loader: ebayAuthConfirmLoader
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

  //-- Effects --//

  useEffect(() => {

    //initPlatforms();
    
  }, [])

  return (
    <AuthContext.Provider value={{user, setUser}}>
      {/* <PlatformsContext.Provider value={{platforms: platformsRef.current}}> */}
        <RouterProvider router={router} />
        <SnackbarProvider />
      {/* </PlatformsContext.Provider> */}
    </AuthContext.Provider>
    
  )
}

export default App
