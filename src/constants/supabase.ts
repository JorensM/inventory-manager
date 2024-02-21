export const tables = {
    listings: 'listings'
}

export const buckets = {
    listing_images: 'listing_images'
}

export const validateBucketName = (bucket_name: string) => {
    if(!Object.values(buckets).includes(bucket_name)) {
        throw new Error('Bucket name ' + bucket_name + ' is not a valid bucket name');
    }
}