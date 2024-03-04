// WIP

export default function EbayListingSection() {
    return (
        <>
            <h3>eBay</h3>
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
        </>
    )
}