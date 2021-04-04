module.exports = {
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
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
