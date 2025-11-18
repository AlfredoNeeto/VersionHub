import "dotenv/config";

export const env = {
    redisUrl: process.env.UPSTASH_REDIS_REST_URL!,
    redisToken: process.env.UPSTASH_REDIS_REST_TOKEN!,
};
