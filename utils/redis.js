import { createClient } from 'redis';
import { promisify } from 'util';

// Class to define methods for commonly used Redis commands
class RedisClient {
    constructor() {
        this.client = createClient(); // Create a Redis client
        this.client.on('error', (error) => {
            console.log(`Redis client not connected to server: ${error}`); // Log connection errors
        });
    }

    // Check connection status and report
    isAlive() {
        return this.client.connected; // Return true if the client is connected, otherwise false
    }

    // Get value for given key from Redis server
    async get(key) {
        const getAsync = promisify(this.client.get).bind(this.client); // Promisify the get method
        return await getAsync(key); // Return the value associated with the key
    }

    // Set key-value pair to Redis server
    async set(key, value, duration) {
        const setAsync = promisify(this.client.set).bind(this.client); // Promisify the set method
        await setAsync(key, value); // Set the key-value pair
        await this.client.expire(key, duration); // Set expiration time for the key
    }

    // Delete key-value pair from Redis server
    async del(key) {
        const delAsync = promisify(this.client.del).bind(this.client); // Promisify the del method
        await delAsync(key); // Delete the key-value pair
    }
}

const redisClient = new RedisClient();

module.exports = redisClient; // Export an instance of RedisClient
