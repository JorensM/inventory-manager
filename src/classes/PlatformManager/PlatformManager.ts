export default abstract class PlatformManager {

    /**
     * Platform manager base class. 
     */

    api_key: string

    constructor(api_key: string) {
        this.api_key = api_key;
    }
    
    abstract ping(): Promise<boolean>;
    
    setApiKey(api_key: string) {
        this.api_key = api_key
    }
    
}