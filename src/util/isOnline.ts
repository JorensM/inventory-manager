/**
 * Check if user is connected to the internet. Pings Google
 */
export default async function isOnline(): Promise<boolean> {
    return new Promise((resolve, reject) => {
        // approach taken from https://github.com/HubSpot/offline/blob/master/js/offline.js#L223
        const img = document.createElement('img');
        img.onerror = () => {
            // calling `reject` basically means `throw` if using `await`.
            // Instead, we'll just resovle with `false`. (https://www.swyx.io/errors-not-exceptions)
            resolve(false);
        };
        img.onload = () => {
            resolve(true);
        };
        img.src = 'https://www.google.com/favicon.ico?_=' + ((new Date()).getTime());
    });
}