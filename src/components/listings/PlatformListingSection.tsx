// Core
import { Link } from 'react-router-dom';

// Constants
import { listing_fields, listing_platform_status, platform_name } from '@/constants/localization';

// Types
import { Status } from '@/types/Status';
import { Listing, ListingPlatformStatus, ListingStatus, PlatformListing } from '@/types/Listing';

// Components
import SelectInput from '../input/SelectInput';
import StatusIndicator from '../misc/StatusIndicator';
import { PlatformID } from '@/types/Platform';

type PlatformListingSectionProps = {
    /**
     * Title of the section
     */
    title: string
    /**
     * Status of the reverb listing
     */
    status: ListingPlatformStatus | 'loading'
    /**
     * ID of platform
     */
    platform_id: PlatformID
    /**
     * The publish status that is stored in the form
     */
    local_publish_status: ListingStatus
    /**
     * Formik input name for the publish status input
     */
    publish_status_field_name: string
    /**
     * The sync status of the listing
     */
    sync_status: Status | null
    /**
     * The associated Reverb listing object
     */
    platform_listing: PlatformListing | null | undefined
    /**
     * Missing fields for publishing
     */
    missingFields: string[]
    /**
     * missing fields for creating a draft
     */
    missingFieldsDraft?: string[]
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
 * Listing component that displays info about a listing and allows you to update its status. 
 * This component should be in a Formik form
 */
export default function PlatformListingSection( { 
    title,
    platform_id,
    status, 
    local_publish_status,
    publish_status_field_name,
    sync_status,
    platform_listing,
    onStatusChange,
    missingFields,
    missingFieldsDraft,
    is_update_disabled,
    onUpdateClick
}: PlatformListingSectionProps) {
    return (
        <> 
            <h3>{title}</h3>
            <ul>
                {['draft', 'published'].includes(status || "") ?
                    <li>
                        <Link to={platform_listing!.link}>Link</Link>
                    </li>
                : null}
                <li>
                    {status == 'loading' ? 
                        'loading...' 
                    : 
                        <SelectInput
                            label='Status'
                            name={publish_status_field_name}
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
                    {local_publish_status == 'draft' && missingFieldsDraft?.length ?
                        <span className='warn list-with-description'>
                            In order to upload the listing on {platform_name[platform_id]}, you must fill the following
                            fields for the listing:
                            <ul className='list'>
                                {missingFieldsDraft.map(field_key => (
                                    <li>{listing_fields[field_key as keyof Listing]}</li>
                                ))}
                            </ul>
                        </span>
                    : null}
                    {local_publish_status == 'published' && missingFields.length ?
                        <span className='warn list-with-description'>
                            In order to publish the listing on {platform_name[platform_id]}, you must fill the following
                            fields for the listing:
                            <ul className='list'>
                                {missingFields.map(field_key => (
                                    <li>{listing_fields[field_key as keyof Listing]}</li>
                                ))}
                            </ul>
                        </span>
                    : null}
                    
                </li>
                {['draft', 'published'].includes(status || "") && sync_status != null ?
                    <li>
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
                    disabled={(
                        is_update_disabled ||
                        (local_publish_status == 'published' && missingFields.length > 0) ||
                        (local_publish_status == 'draft' && missingFieldsDraft && missingFieldsDraft.length > 0)
                    )}
                >
                    {status == 'not-uploaded' ? 'Upload' : 'Sync'}
                </button>
            : null}
        </>
    )
}