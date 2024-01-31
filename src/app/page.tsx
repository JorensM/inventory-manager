// Core
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <header>
        <h1>Inventory Manager</h1>
      </header>
      <main className='landing'>
        <section>
          <Link href='/login'>Sign in</Link>
          <br/>
          <br/>
          <Link href='/signup'>Sign up</Link>
        </section>
        
      </main>
    </>
    
  );
}
