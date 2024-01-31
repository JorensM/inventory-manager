'use client';

// Core
import { ComponentProps } from 'react';

// Types
import { Listing } from '@/types/Listing';

type ListingSmallProps = ComponentProps<'div'> & {
    data: Listing
}

export default function ListingSmall( { data, ...props }: ListingSmallProps) {
    return (
        <div
            className='card card-clickable'
            {...props}
        >
            {data.title}
        </div>
    );
}