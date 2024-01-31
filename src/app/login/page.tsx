import Link from 'next/link';
import { login } from './actions';

export default function LoginPage() {
  return (
    <>
      <header className='auth'>
        <h1><Link href='/'>Inventory Manager</Link></h1>
      </header>
      <main className='auth'>
        <section>
          <h2>Log in</h2>
          <form>
              <label htmlFor="email">Email:</label>
              <input id="email" name="email" type="email" required />
              <label htmlFor="password">Password:</label>
              <input id="password" name="password" type="password" required />
              <button formAction={login}>Log in</button>
              {/* <button formAction={signup}>Sign up</button> */}
          </form>
        </section>
      </main>
    </>
    
  );
}