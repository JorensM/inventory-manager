'use client'

// Core
import { useRouter } from 'next/navigation'

export default function BackButton(){

    const router = useRouter();

    return (
        <div
            className='link'
            onClick={router.back}
        >
            Back
        </div>
    )
}