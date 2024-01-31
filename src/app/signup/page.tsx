// Actions
import { signup } from './actions';

export default function LoginPage() {
  return (
    <main>
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
  );
}