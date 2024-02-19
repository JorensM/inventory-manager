// Core
import { useEffect, useMemo, useState } from 'react';
import { Link, useLoaderData, useNavigate, useRevalidator } from 'react-router-dom';
import { Formik } from 'formik';

// Classes
import ListingManager from '@/classes/ListingManager';
import platforms from '@/classes/PlatformManager/AllPlatforms';

// Components
import SessionPage from '@/components/layout/SessionPage';
import StatusIndicator from '@/components/misc/StatusIndicator';
import SelectInput from '@/components/input/SelectInput';

// Constants
import { listing_fields, listing_platform_status, platform_name } from '@/constants/localization';
import routes from '@/constants/routes';

// Hooks
import useSettings from '@/hooks/useSettings';

// Types
import { Listing, ListingPlatformStatus, ListingStatus, PlatformListings } from '@/types/Listing';
import { PlatformID } from '@/types/Platform';
import { Status } from '@/types/Status';
import { getListingStatus } from '@/util/listings';
import { required_platform_fields } from '@/constants/required_fields';
import { Category } from '@/types/Category';

type FormValues = {
    reverb_status: 'published' | 'draft'
}

/**
 * Listing page where user can view a listing
 */
export default function ListingPage() {

    // Hooks
    // const { listing_id } = useParams();
    const { listing, platform_listings, category } = useLoaderData() as { listing: Listing, platform_listings: PlatformListings, category: Category | null }
    const settings = useSettings();
    const navigate = useNavigate();

    //const listings = useListings();
    const { revalidate } = useRevalidator();
    
    // State
    // const [ listing, setListing ] = useState<Listing | null>(null);
    const [ platformsStatuses, setPlatformsStatuses ] = useState<Record<PlatformID, ListingPlatformStatus | 'loading'>>({
        reverb: 'loading',
        ebay: 'loading'
    })
    const [ platformSyncStatuses, setPlatformSyncStatuses ] = useState<Record<PlatformID, Status | null>>({
        reverb: null,
        ebay: null
    })
    
    console.log(platformSyncStatuses)

    //-- Memo --//

    /**
     * Wheter update button for corresponding platform should be disabled. It will
     * be only be enabled if sync status is null or fail.
     */
    const isPlatformUpdateDisabled: Record<PlatformID, boolean> = useMemo(() => ({
        reverb: !['fail', null].includes(platformSyncStatuses.reverb),
        ebay: !['fail', null].includes(platformSyncStatuses.ebay)
    }), [ platformSyncStatuses ])

    /**
     * List of missing fields that are required to publish a listing on the respective platform
     * 
     * @return Object for each platform with an array of keys of missing fields 
     */
    const missingFields: Record<PlatformID, (keyof Listing)[]> = useMemo(() => {

        const missing_fields: Record<PlatformID, (keyof Listing)[]> = {
            reverb: [],
            ebay: []
        }

        /**
         * Check if there are any missing fields and append them to `missing_fields`
         */
        for(const platform_id in required_platform_fields) {
            for(const listing_property_key of required_platform_fields[platform_id as PlatformID]) {
                const property = listing[listing_property_key as keyof Listing];
                if(!property || property == '' || (Array.isArray(property) && property.length == 0)) {
                    console.log(listing_property_key);
                    missing_fields[platform_id as PlatformID].push(listing_property_key as keyof Listing)
                }
            }
        }

        return missing_fields;
    }, [listing])
    
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
    const setPlatformStatus = (platform_id: PlatformID, status: ListingPlatformStatus | 'loading') => {
        setPlatformsStatuses((old_state) => {
            const new_state = {...old_state};
            new_state[platform_id] = status;
            return new_state
        })
    }

    /**
     * Get statuses of all platforms and set their respective state
     */
    const updatePlatformStatuses = async () => {
        if(!listing) {
            throw new Error("Can't get platform status because listing state is not set")
        }
        updatePlatformStatus('reverb');
    }

    /**
     * Get status of particular platform and set its respective state
     */
    const updatePlatformStatus = async (platform_id: PlatformID) => {
        
        const status = await getListingStatus(listing, platform_id);

        setPlatformStatus(platform_id, status)
    }

    /**
     * Set platform sync status for specific platform
     * @param platform_id Id of platform
     * @param status new status
     */
    const setPlatformSyncStatus = (platform_id: PlatformID, status: Status) => {
        setPlatformSyncStatuses((old_state) => {
            const new_state = {...old_state};
            new_state[platform_id] = status;
            return new_state;
        })
    }

    /**
     * Get sync statuses of all platforms
     */
    const updatePlatformSyncStatuses = async () => {
        if(!listing) {
            throw new Error("Can't get platform sync statuses because listing state is not set")
        }

        const reverb = platforms.get('reverb');

        if(reverb.isEnabled() && listing.reverb_id) {
            updatePlatformSyncStatus('reverb');
        }
        
    }

    const updatePlatformSyncStatus = async (platform_id: PlatformID) => {
        setPlatformSyncStatus(platform_id, 'loading');

        //const platform_listing = await platforms.platforms[platform_id].getListing(listing);

        if(!platform_listings[platform_id]) {
             throw new Error('Could not find platform listing for platform ' + platform_id);
        }

        const synced = await platforms.platforms[platform_id].isSynced(listing, platform_listings[platform_id]!);

        const status: Status = synced ? 'success' : 'fail'

        setPlatformSyncStatus(platform_id, status);
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

        if(listing[platform_id + '_id' as keyof Listing]) {
            //console.log('updating')
            await platforms.platforms[platform_id].updateListing(listing);
        } else {
            const platform_listing_id = await platforms.platforms[platform_id].uploadListing(listing);

            await ListingManager.updateListing({
                id: listing.id,
                [platform_id + '_id']: platform_listing_id
            })
        }

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

    const handleDeleteClick = async () => {
        const confirm_deletion = confirm('Are you sure you want to delete the listing? It will be deleted on Reverb as well');
        if(confirm_deletion) {
            await ListingManager.deleteListing(listing);

            for(const platform_id in platforms.platforms) {
                platforms.platforms[platform_id as PlatformID].deleteListing(listing)
            }
            navigate(routes.listings)
        }
        
    }

    const handleStatusInputChange = async (new_status: 'published' | 'draft', platform_id: PlatformID) => {
        if(platform_id == 'reverb') {
            await ListingManager.updateListing({
                id: listing.id,
                reverb_status: new_status
            })
        }

        revalidate();
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
            updatePlatformStatuses();
            updatePlatformSyncStatuses();
        }
        
    }, [listing])

    return (
        <SessionPage>
            <section>
                <Link to={routes.listings}>Back to listings</Link>
            </section>
            {listing ?
                <Formik<FormValues>
                    initialValues={{
                        reverb_status: listing.reverb_status || 'draft'
                    }}
                    onSubmit={() => {}}
                >
                    {formik => (
                        <>
                            <section>
                                    <h1>{listing.title}</h1>
                                    <Link className='text-btn' to={routes.edit_listing(listing.id)}>Edit listing</Link>
                                    <button
                                        type='button'
                                        className='text-btn warn block'
                                        onClick={handleDeleteClick}
                                    >
                                        Delete listing
                                    </button>
                                    {category ? 
                                        <><b>Category:</b> { category!.name }</>
                                    : null}
                                    
                            </section>
                            <section>
                                <h2>Platforms</h2>
                                {platforms.get('reverb').isEnabled() ? 
                                    <> 
                                        <h3>Reverb</h3>
                                        <ul>
                                            {['draft', 'published'].includes(platformsStatuses.reverb) ?
                                                <li>
                                                    <Link to={platform_listings.reverb!.link}>Link</Link>
                                                </li>
                                            : null}
                                            <li>
                                                {platformsStatuses.reverb == 'loading' ? 
                                                    'loading...' 
                                                : 
                                                    <SelectInput
                                                        label='Status'
                                                        name='reverb_status'
                                                        options={[
                                                            {
                                                                label: listing_platform_status.draft,
                                                                value: 'draft'
                                                            },
                                                            {
                                                                label: listing_platform_status.published,
                                                                value: 'published'
                                                            }
                                                        ]}
                                                        onChange={(e) => handleStatusInputChange(e.currentTarget.value as ListingStatus, 'reverb')}
                                                    />
                                                }
                                                {formik.values.reverb_status == 'published' && missingFields.reverb.length ?
                                                    <span className='warn list-with-description'>
                                                        In order to publish the listing on {platform_name.reverb}, you must fill the following
                                                        fields for the listing:
                                                        <ul className='list'>
                                                            {missingFields.reverb.map(field_key => (
                                                                <li>{listing_fields[field_key]}</li>
                                                            ))}
                                                        </ul>
                                                    </span>
                                                : null}
                                                
                                            </li>
                                            {['draft', 'published'].includes(platformsStatuses.reverb) && platformSyncStatuses.reverb != null ?
                                                <li>
                                                    <div className='key-value-container'>
                                                        Sync status:                                    
                                                        <StatusIndicator
                                                            status={platformSyncStatuses.reverb}
                                                        />
                                                    </div>
                                                </li>
                                            : null}
                                        </ul>
                                        
                                        
                                        {platformsStatuses.reverb != 'loading' ?
                                            <button
                                                type='button'
                                                onClick={() => handlePlatformUpdateClick('reverb')}
                                                disabled={isPlatformUpdateDisabled.reverb || formik.values.reverb_status == 'published'}
                                            >
                                                {platformsStatuses.reverb == 'not-uploaded' ? 'Upload' : 'Sync'}
                                            </button>
                                        : null}
                                    </>
                                : null}
                            </section>
                        </>
                    )}
                    
                </Formik>
            : "Could not find listing"}
        </SessionPage>
        
    );
}