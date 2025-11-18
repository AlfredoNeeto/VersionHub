import { redis } from "../../config/redis";

export default {
    async get(key: string) {
        return await redis.get(key);
    },

    async set(key: string, value: any, ttlInSeconds: number) {
        return await redis.set(key, value, { ex: ttlInSeconds });
    }
};