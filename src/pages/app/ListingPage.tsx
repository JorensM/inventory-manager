// Core
import { useEffect, useState } from 'react';
import { Link, LoaderFunctionArgs, useLoaderData, useRevalidator } from 'react-router-dom';

// Classes
import ListingManager from '@/classes/ListingManager';

// Components
import SessionPage from '@/components/layout/SessionPage';

// Constants
import { listing_platform_status } from '@/constants/localization';
import routes from '@/constants/routes';

// Hooks
import usePlatforms from '@/hooks/usePlatforms';

// Types
import { Listing, ListingPlatformStatus } from '@/types/Listing';
import { PlatformID } from '@/types/Platform';
import useSettings from '@/hooks/useSettings';

/**
 * Listing page where user can view a listing
 */
export default function ListingPage() {

    // Hooks
    // const { listing_id } = useParams();
    const listing: Listing = useLoaderData() as Listing
    const settings = useSettings();

    console.log(listing);
    //const listings = useListings();
    const { revalidate } = useRevalidator();
    const platforms = usePlatforms();
    
    // State
    // const [ listing, setListing ] = useState<Listing | null>(null);
    const [ platformsStatuses, setPlatformsStatuses ] = useState<Record<PlatformID, ListingPlatformStatus | 'loading'>>({
        reverb: 'loading',
        ebay: 'loading'
    })
    
    // Functions

    /**
     * Fetch listing and set its state to the fetched data
     */
    // const fetchListing = async () => {
    //     const _listing = await listings.fetchListing(parseInt(listing_id!))

    //     console.log(_listing);

    //     setListing(_listing);
    // }

    /**
     * Set platform status for specific platform
     * @param platform_id Id of platform
     * @param status new status
     */
    const setPlatformsStatus = (platform_id: PlatformID, status: ListingPlatformStatus | 'loading') => {
        setPlatformsStatuses((old_state) => {
            const new_state = {...old_state};
            new_state[platform_id] = status;
            return new_state
        })
    }

    /**
     * Get statuses of all platforms and set their respective state
     */
    const getPlatformStatuses = async () => {
        if(!listing) {
            throw new Error("Can't get platform status because listing state is not set")
        }
        getPlatformStatus('reverb');
    }

    /**
     * Get status of particular platform and set its respective state
     */
    const getPlatformStatus = async (platform_id: PlatformID) => {
        
        const status = await platforms.getListingStatus(listing, platform_id)

        setPlatformsStatus(platform_id, status)
    }

    //-- Handlers --//

    /**
     * On platform update button click. Syncs platform's listing with Supabase listing
     * @param platform_id ID of platform
     */
    const handlePlatformUpdateClick = async (platform_id: PlatformID) => {
        if(!listing) {
            throw new Error('Listing state not set')
        }
        const platform_listing_id = await platforms.platforms[platform_id].uploadListing(listing); //#TODO: add ID to listing

        await ListingManager.updateListing({
            id: listing.id,
            [platform_id + '_id']: platform_listing_id
        })

        revalidate();

        // setListing((old_state) => {
        //     if(!old_state) {
        //         throw new Error('Cannot update listing because listing state is not set')
        //     }
        //     const new_state = {...old_state};
        //     new_state[platform_id + '_key' as PlatformIDKey] = platform_listing_id;
        //     return new_state;
        // })
    }

    // Effects

    /**
     * Fetch listing on load
     */
    // useEffect(() => {
    //     fetchListing()
    // }, [])

    useEffect(() => {
        if (listing) {
            getPlatformStatuses();
        }
        
    }, [listing])

    return (
        <SessionPage>
            <section>
                <Link to={routes.listings}>Back to listings</Link>
            </section>
            {listing ?
                <>
                    <section>
                            <h1>{listing.title}</h1>
                            <Link to={routes.edit_listing(listing.id)}>Edit listing</Link>
                    </section>
                    <section>
                        <h2>Platforms</h2>
                        {settings.getAPIKey('reverb') ? 
                            <> 
                                <h3>Reverb</h3>
                                <p>
                                    Status: 
                                    {platformsStatuses.reverb == 'loading' ? 
                                        'loading...' 
                                    : 
                                        listing_platform_status[platformsStatuses.reverb]
                                    }
                                </p>
                                {platformsStatuses.reverb != 'loading' ?
                                    <button
                                        onClick={() => handlePlatformUpdateClick('reverb')}
                                        disabled={platformsStatuses.reverb !== 'not-uploaded'}
                                    >
                                        {platformsStatuses.reverb == 'not-uploaded' ? 'Upload' : 'Update'}
                                    </button>
                                : null}
                            </>
                            
                        : null}
                        
                    </section>
                </>
            : "Could not find listing"}
        </SessionPage>
        
    );
}