const routes = {
    listings: '/app/listings',
    new_listing: '/app/listings/edit',
    edit_listing: (listing_id: number) => '/app/listings/edit/' + listing_id,
    listing: (listing_id: number) => '/app/listings/' + listing_id,
    categories: '/app/categories',
    category: (category_id: number) => '/app/categories/' + category_id,
    new_category: '/app/categories/edit',
    edit_category: (category_id: number) => '/app/categories/edit/' + category_id,
    login: '/login',
    dashboard: '/app/dashboard',
    new_team: '/app/teams/edit',
    settings: '/app/settings'
}

export default routes;