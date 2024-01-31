import LandingPage from '@/components/layout/LandingPage';
import { Link } from 'react-router-dom';

export default function HomePage() {
    return (
      <LandingPage>
        <section>
          <Link to='/login'>Sign in</Link>
          <br/>
          <br/>
          <Link to='/signup'>Sign up</Link>
        </section>
      </LandingPage>
      
    );
  }