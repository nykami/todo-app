import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import http from 'http';
import mongoose from 'mongoose';
import router from './router';
import { env } from './config';

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/', router);

async function connectToDb() {
  try {
    const connectOptions: mongoose.ConnectOptions = {
      dbName: env.db_name,
    };

    await mongoose.connect(`${env.mongo_url}`, connectOptions);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

async function startServer() {
  try {
    await connectToDb();

    const server = http.createServer(app);

    server.listen(env.port, () =>
      console.log(`Server running on http://${env.host}:${env.port}/`)
    );
  } catch (error) {
    console.error('Server connection error:', error);
  }
}

startServer();
