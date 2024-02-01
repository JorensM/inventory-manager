import PlatformManager from './PlatformManager';

export default class ReverbManager extends PlatformManager {

    /**
     * Reverb integration
     */

    /**
     * Whether requests should be made to Sandbox Reverb or live Reverb
     */
    is_sandbox: boolean;

    constructor(api_key: string | null, is_sandbox: boolean) {
        super(api_key);

        this.is_sandbox = is_sandbox;
    }

    async GET(endpoint: string, api_key = this.api_key) {

        if(!api_key) {
            throw new Error('Cannot make Reverb request because API key is not set');
        }
        const res = await fetch(`https://${this.is_sandbox ? 'sandbox' : 'api'}.reverb.com/api/` + endpoint, {
            headers: {
                "Content-Type": "application/hal+json",
                "Accept": "application/hal+json",
                "Accept-Version": "3.0",
                "Authorization": `Bearer ${api_key}`
            }
        });
        if(!res.ok) {
            if(res.status == 401) {
                throw new Error('Reverb: Unauthorized')
            }
            return null;
        }

        const data = await res.json();

        return data;
    }

    async ping(api_key: string) {
        try {
            const data = await this.GET('my/account', api_key);

            if(data) {
                return true;
            }
            return false;
        } catch {
            return false;
        }
        
    }
}