export const appConfig = {
  DB_URL: process.env.MONGO_URI || "mongodb://localhost:27017",
  PORT: process.env.PORT || 8080,
};
