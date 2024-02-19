export default async function reverbCategoriesPageLoader() {
    const res = await fetch("https://api.reverb.com/api/categories/flat", {
        headers: {
            "Accept-Version": "3.0"
        }
    })
    const data = await res.json();

    const categories = data.categories;

    return { categories }
}