export default {
  // Enable React Strict Mode for better error detection
  reactStrictMode: true,


  // Remove unsupported experimental option
  experimental: {
    // Removed memoryBasedWorkers
    // Add other experimental features supported in 15.3.3 if needed
  },

  // Ensure proper handling of environment variables
  env: {
    NEXT_PUBLIC_Backend_URL: process.env.NEXT_PUBLIC_Backend_URL,
  },
};