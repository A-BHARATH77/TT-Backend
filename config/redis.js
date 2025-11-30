import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const redisUrl = process.env.REDIS_HOST
  ? `redis://${process.env.REDIS_PASSWORD ? `:${process.env.REDIS_PASSWORD}@` : ''}${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
  : process.env.REDIS_URL; // only fallback if a full URL is explicitly set

console.log('🔄 Connecting to Redis:', redisUrl);

const redis = createClient({ url: redisUrl });

redis.on('error', (err) => console.error('❌ Redis Client Error:', err));
redis.on('connect', () => console.log('✅ Redis connected'));

await redis.connect(); // still top-level await, but allowed since file is an ES module loaded by Node 20+ on Render

export default redis;
