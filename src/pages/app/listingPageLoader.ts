// Core
import { LoaderFunctionArgs } from 'react-router-dom';

// Classes
import ListingManager from '@/classes/ListingManager';

/**
 * Listing Page loader
 * @returns Requested Listing object
 */
export default async function ( { params }: LoaderFunctionArgs ) {
    const listing = await ListingManager.fetchListing(parseInt(params.listing_id!));
    return listing;
}