/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://neondb_owner:CciX7vhwQ0KA@ep-little-union-a5a6tij4.us-east-2.aws.neon.tech/ai-interview-mocker?sslmode=require',
    }
  };