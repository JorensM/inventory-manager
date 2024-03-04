// Core
import { PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'

// Components
import Page from './Page'

/**
 * Component for landing pages
 */
export default function LandingPage( { children }: PropsWithChildren) {

    return (
        <Page>
            <header className='auth'>
                <h1><Link  className='heading-link' to='/'>Inventory Manager</Link></h1>
            </header>
            <main className='landing'>
                {children}
            </main>
        </Page>
        
    )
}