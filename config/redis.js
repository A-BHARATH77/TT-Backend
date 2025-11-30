import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
  console.error("❌ REDIS_URL is not set in environment! Render provides this after Redis service is created.");
  // Don't exit, let backend start and retry Redis connection
}

console.log("🔄 Connecting to Redis using:", redisUrl || "waiting for Render to inject REDIS_URL...");

const redis = createClient({
  url: redisUrl
});

redis.on('error', err => console.error("❌ Redis Error:", err));

async function connectRedis() {
  try {
    await redis.connect();
    console.log("✅ Redis connected successfully");
  } catch {
    console.error("⏳ Redis connection failed, retrying in 5 seconds...");
    setTimeout(connectRedis, 5000); // Render needs time to provision Redis
  }
}

connectRedis();

export default redis;
