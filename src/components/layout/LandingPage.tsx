import { PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'
import Page from './Page'

type LandingPageProps = {

}

export default function LandingPage( { children }: PropsWithChildren<LandingPageProps>) {

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