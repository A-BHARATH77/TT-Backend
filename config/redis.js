import { createClient } from 'redis';

// Build Redis URL from environment variables
const redisUrl = process.env.REDIS_URL || 
  (process.env.REDIS_HOST && process.env.REDIS_PORT
    ? `redis://${process.env.REDIS_PASSWORD ? `:${process.env.REDIS_PASSWORD}@` : ''}${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
    : 'redis://localhost:6379');

console.log('🔄 Connecting to Redis...');

const redis = createClient({
  url: redisUrl
});

redis.on('error', (err) => console.error('❌ Redis Client Error:', err));
redis.on('connect', () => console.log('✅ Redis connected'));

await redis.connect();

export default redis;
