
const ENV_VAR_NAMES = [
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "NEXT_PUBLIC_SUPABASE_URL"
];

const validateEnvVars = () => {

    const MISSING_VARS = [];

    for(const VAR_NAME of ENV_VAR_NAMES) {
        if(!process.env[VAR_NAME]) {
            MISSING_VARS.push(ENV_VAR_NAMES);
        }
    }

    if (MISSING_VARS.length) {
        throw new Error("Missing the following environment variables: " + MISSING_VARS);
    }
};

validateEnvVars();

export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;