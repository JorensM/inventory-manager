import { PropsWithChildren } from 'react'



type SessionPageProps = {

}

export default function SessionPage( { children }: PropsWithChildren<SessionPageProps>) {
    return (
        <>
            <header>
                {/* <p>Hello {data.user.email}</p> */}
                {/* <SignOutButton/> */}
            </header>
            <main className='private'>
                { children }
            </main>
        </>
    )
}