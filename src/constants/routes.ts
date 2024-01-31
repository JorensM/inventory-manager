const routes = {
    listings: '/app/listings',
    new_listing: '/app/listings/edit',
    listing: (listing_id: number) => '/app/listings/' + listing_id
}

export default routes;