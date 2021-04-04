import * as dotenv from "dotenv";
import "reflect-metadata";

dotenv.config();

export default {
  PORT: process.env.PORT,
  POSTGRES_HOST: process.env.POSTGRES_HOST,
  POSTGRES_PORT: process.env.POSTGRES_PORT,
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,
  POSTGRES_URL: process.env.POSTGRES_URL,
  SECRET: process.env.SECRET,
};
