
const ENV_VAR_NAMES = [
    "VITE_SUPABASE_ANON_KEY",
    "VITE_SUPABASE_URL",
    "VITE_API_URL",
    "VITE_APP_URL"
]

const validateEnvVars = () => {
    const missing_vars = []
    for(const ENV_VAR_NAME of ENV_VAR_NAMES) {
        if(!import.meta.env[ENV_VAR_NAME]) {
            missing_vars.push(ENV_VAR_NAME);
        }
    }
    if (missing_vars.length) {
        throw new Error('Missing the following ENV variables: ' + missing_vars);
    }
}

validateEnvVars();

export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY!;
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
export const IS_DEV = import.meta.env.DEV;
export const API_URL = import.meta.env.VITE_API_URL;
export const APP_URL = import.meta.env.VITE_APP_URL;