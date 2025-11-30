import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.REDIS_HOST) {
  console.error("❌ REDIS_HOST is not set in environment! Make sure Redis service is linked in Render.");
  process.exit(1);
}

const redisUrl = `redis://${process.env.REDIS_PASSWORD ? `:${process.env.REDIS_PASSWORD}@` : ''}${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`;

console.log('🔄 Connecting to Redis:', redisUrl);

const redis = createClient({ url: redisUrl });

redis.on('error', (err) => console.error('❌ Redis Client Error:', err));
redis.on('connect', () => console.log('✅ Redis connected'));

await redis.connect();

export default redis;
