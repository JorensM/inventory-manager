
import SessionPage from '@/components/layout/SessionPage';
import routes from '@/constants/routes';
import { Link } from 'react-router-dom';

export default function PrivatePage() {
  return (
    <SessionPage>
        <section className='card'>

            <h1>Dashboard</h1>
            <ul>
                <li>
                    <Link to={routes.listings}>My listings</Link>
                </li>
                <li>
                    <Link to={routes.new_listing}>New listing</Link>
                </li>
            </ul>
        </section>
    </SessionPage>
  );
}