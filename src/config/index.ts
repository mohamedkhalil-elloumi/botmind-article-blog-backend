import * as dotenv from "dotenv";
import "reflect-metadata";
// environment variables initiation
dotenv.config();

export default {
  PORT: process.env.PORT,
  POSTGRES_URL: process.env.POSTGRES_URL,
  SECRET: process.env.SECRET,
};
