import { API_URL } from '@/constants/env'

type Params = {
    [key: string]: string
}

export const apiGET = async (endpoint: string, params?: Params, response_type: 'json' | 'text' = 'json') => {

    const url = new URL(API_URL + endpoint);

    if(params) Object.entries(params).map(([key, value]) => url.searchParams.set(key, value));

    const res = await fetch(url)

    if (response_type == 'json') {
        return await res.json();
    } else if (response_type == 'text') {
        return await res.text();
    }
}