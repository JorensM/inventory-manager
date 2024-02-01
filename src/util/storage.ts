const prefix = 'inventory-manager:'

const storage = {
    get: (key: string) => {
        return JSON.parse(localStorage.getItem(prefix + key) || "{}");
    },
    set: (key: string, value: any) => {
        localStorage.setItem(key, JSON.stringify(value));
    }
}

export default storage;