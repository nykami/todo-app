import express from 'express';
import 'dotenv/config';

export const env = {
  db_name: process.env.DB_NAME,
  port: process.env.PORT,
  host: process.env.HOST,
  mongo_url: process.env.MONGO_URL,
};
