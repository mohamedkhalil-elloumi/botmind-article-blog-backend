module.exports = {
  type: "postgres",
  url: process.env.POSTGRES_URL,
  synchronize: true,
  logging: false,
  entities: ["dist/entity/**/*.js"],
  extra: {
    ssl: { rejectUnauthorized: false },
  },
  cli: {
    entitiesDir: "src/entity",
  },
};
