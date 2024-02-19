
import SessionPage from '@/components/layout/SessionPage';
import routes from '@/constants/routes';
import { Link } from 'react-router-dom';

export default function PrivatePage() {
  return (
    <SessionPage>
        <section className='card'>

            <h1>Dashboard</h1>
            <h2>Listings</h2>
            <nav>
                <ul>
                    <li>
                        <Link to={routes.listings}>My listings</Link>
                    </li>
                    <li>
                        <Link to={routes.new_listing}>New listing</Link>
                    </li>
                </ul>
            </nav>
            <h2>Categories</h2>
            <nav>
                <ul>
                    <li>
                        <Link to={routes.categories}>My categories</Link>
                    </li>
                    <li>
                        <Link to={routes.new_category}>New category</Link>
                    </li>
                    <li>
                        <Link to={routes.reverb_categories}>Reverb categories list</Link>
                    </li>
                </ul>
            </nav>
            
        </section>
    </SessionPage>
  );
}