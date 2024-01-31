import { PropsWithChildren, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'

type LandingPageProps = {

}

export default function LandingPage( { children }: PropsWithChildren<LandingPageProps>) {

    const location = useLocation();

    const isHomePage = useMemo(() => {
        return location.pathname == '/'
    }, [location])

    return (
        <>
            <header className='auth'>
                <h1><Link  className='heading-link' to='/'>Inventory Manager</Link></h1>
            </header>
            <main className='landing'>
                {children}
            </main>
        </>
        
    )
}