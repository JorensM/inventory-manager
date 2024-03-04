// Core
import { Link } from 'react-router-dom';

// Constants
import { listing_fields, listing_platform_status, platform_name } from '@/constants/localization';

// Types
import { Status } from '@/types/Status';
import { Listing, ListingPlatformStatus, ListingStatus, ReverbListing } from '@/types/Listing';

// Components
import SelectInput from '../input/SelectInput';
import StatusIndicator from '../misc/StatusIndicator';

type ReverbListingSectionProps = {
    /**
     * Status of the reverb listing
     */
    status: ListingPlatformStatus | 'loading'
    /**
     * The publish status that is stored in the form
     */
    local_publish_status: ListingStatus
    /**
     * The sync status of the listing
     */
    sync_status: Status | null
    /**
     * The associated Reverb listing object
     */
    reverb_listing: ReverbListing | null | undefined
    /**
     * Missing fields for publishing
     */
    missingFields: string[]
    /**
     * Is updating the listing disabled
     */
    is_update_disabled: boolean
    /**
     * On status input change
     * @param new_status The new status
     */
    onStatusChange: (new_status: ListingStatus) => void
    /**
     * On listing update click
     */
    onUpdateClick: () => void
}

/**
 * Reverb listing component. This component should be in a Formik form
 * @deprecated Use of this component should be changed to PlatformListingSection
 */
export default function ReverbListingSection( { 
    status, 
    local_publish_status,
    sync_status,
    reverb_listing,
    onStatusChange,
    missingFields,
    is_update_disabled,
    onUpdateClick
}: ReverbListingSectionProps) {
    return (
        <> 
            <h3>Reverb</h3>
            <ul>
                {['draft', 'published'].includes(status || "") ?
                    <li key='link'>
                        <Link to={reverb_listing!.link}>Link</Link>
                    </li>
                : null}
                <li key='status'>
                    {status == 'loading' ? 
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
                            onChange={(e) => onStatusChange(e.currentTarget.value as ListingStatus)}
                        />
                    }
                    {local_publish_status == 'published' && missingFields.length ?
                        <span className='warn list-with-description'>
                            In order to publish the listing on {platform_name.reverb}, you must fill the following
                            fields for the listing:
                            <ul className='list'>
                                {missingFields.map(field_key => (
                                    <li key={field_key}>{listing_fields[field_key as keyof Listing]}</li>
                                ))}
                            </ul>
                        </span>
                    : null}
                    
                </li>
                {['draft', 'published'].includes(status || "") && sync_status != null ?
                    <li key='sync-status'>
                        <div className='key-value-container'>
                            Sync status:                                    
                            <StatusIndicator
                                status={sync_status}
                            />
                        </div>
                    </li>
                : null}
            </ul>
            
            
            {status != 'loading' ?
                <button
                    type='button'
                    onClick={onUpdateClick}
                    disabled={is_update_disabled}
                >
                    {status == 'not-uploaded' ? 'Upload' : 'Sync'}
                </button>
            : null}
        </>
    )
}