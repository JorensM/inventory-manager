'use client';

// Core
import { ComponentProps } from 'react';

// Types
import { Listing } from '@/types/Listing';

type GenericListItemProps = ComponentProps<'div'> & {
    /**
     * Label to display
     */
    label: string
}

/**
 * A generic responsive list item with a border and a label
 */
export default function GenericListItem( { label, ...props }: GenericListItemProps) {
    return (
        <div
            className='card card-clickable'
            {...props}
        >
            {label}
        </div>
    );
}