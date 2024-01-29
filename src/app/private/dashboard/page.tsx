import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { createClient } from '@/util/supabase/server'
import Link from 'next/link'

export default async function PrivatePage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/')
  }

  return (
    <section>
      <p>Hello {data.user.email}</p>
      <h1>Dashboard</h1>
      <ul>
        <li>
          <Link href='/private/listings'>My listings</Link>
        </li>
        <li>
          <Link href='/private/listings/edit'>New listing</Link>
        </li>
      </ul>
    </section>
  );
}