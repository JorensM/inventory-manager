import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { createClient } from '@/util/supabase/server'
import Link from 'next/link'
import routes from '@/util/routes'

export default async function PrivatePage() {
  const supabase = createClient()

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
          <Link href={routes.listings}>My listings</Link>
        </li>
        <li>
          <Link href={routes.new_listing}>New listing</Link>
        </li>
      </ul>
    </section>
  );
}