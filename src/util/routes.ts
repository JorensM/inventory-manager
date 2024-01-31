const routes = {
    "listings": "/private/listings",
    "listing": (id: number) => "/private/listings/" + id,
    "edit_listing": (id: number) => "/private/listings/edit?id=" + id,
    "new_listing": "/private/listings/edit",
    "login": "/login",
    "home": "/",
    api: {
        signout: '/api/signout'
    }
};

export default routes;