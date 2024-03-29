import ReverbManager from '@/classes/PlatformManager/ReverbManager';
import { Listing } from '@/types/Listing';

describe('ReverbManager', () => {

    const reverb = new ReverbManager(process.env.REVERB_TEST_KEY!, true);

    describe('uploadListing()', () => {
        it('Should throw error if incorrect listing data is passed', async () => {
            const listing = {
                wrong: 'field',
                incorrect: 'property'
            }

            //@ts-expect-error Purposefully need to pass incorrect type of data for the test
            await expect(reverb.uploadListing(listing))
                .rejects
                .toThrow()
        })

        it('Should return a listing ID if listing was successfully created', async () => {
            const listing: Listing = {
                id: 0,
                user_id: "0",
                team_id: 0,
                title: 'Title',
                brand: 'Brand',
                model: 'Model',
            }

            const response = await reverb.uploadListing(listing);

            expect(typeof response).toEqual('number');
        })
    })
})