import { Link } from 'react-router-dom';

export default function HomePage() {
    return (
      <>
        <header>
          <h1>Inventory Manager</h1>
        </header>
        <main className='landing'>
          <section>
            <Link to='/login'>Sign in</Link>
            <br/>
            <br/>
            <Link to='/signup'>Sign up</Link>
          </section>
          
        </main>
      </>
      
    );
  }