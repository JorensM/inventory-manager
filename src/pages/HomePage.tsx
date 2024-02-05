import LandingPage from '@/components/layout/LandingPage';
import { Link } from 'react-router-dom';

/**
 * Home/Landing page
 */
export default function HomePage() {
    return (
      <LandingPage>
        <section>
          {/* Sign in button */}
          <Link to='/login'>Sign in</Link>
          <br/>
          <br/>
          {/* Sign up button */}
          <Link to='/signup'>Sign up</Link>
        </section>
      </LandingPage>
      
    );
  }