// Actions
import Link from 'next/link';
import { signup } from './actions';

export default function SignupPage() {
  return (
    <>
      <header className='auth'>
        <h1><Link href='/'>Inventory Manager</Link></h1>
      </header>
      <main className='auth'>
        <section> 
          <form>
              <label htmlFor="email">Email:</label>
              <input id="email" name="email" type="email" required />
              <label htmlFor="password">Password:</label>
              <input id="password" name="password" type="password" required />
              <label htmlFor="password">Team Name:</label>
              <input id="team_name" name="team_name" type="text" min={2} max={32} required />
              <button formAction={signup}>Sign up</button>
          </form>
        </section>
      </main>
    </>
    
  );
}