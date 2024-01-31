const routes = {
    listings: '/app/listings',
    new_listing: '/app/listings/edit',
    edit_listing: (listing_id: number) => '/app/listings/edit/' + listing_id,
    listing: (listing_id: number) => '/app/listings/' + listing_id,
    login: '/login',
    dashboard: '/app/dashboard',
    new_team: '/app/teams/edit'
}

export default routes;