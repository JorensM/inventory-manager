import { PropsWithChildren } from 'react';

type PageProps ={

}

export default function Page( { children }: PropsWithChildren<PageProps> ) {
    return (
        {children}
    )
}