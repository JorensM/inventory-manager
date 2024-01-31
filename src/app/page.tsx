// Core
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Inventory Manager</h1>
      <Link href='/login'>Sign in</Link>
      <br/>
      <br/>
      <Link href='/signup'>Sign up</Link>
    </main>
  );
}
