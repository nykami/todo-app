import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import http from 'http';
import mongoose from 'mongoose';
import router from './router';
import "dotenv/config";

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(process.env.PORT, () =>
  console.log(
    `Server running on http://${process.env.HOST}:${process.env.PORT}/`
  )
);

mongoose.Promise = Promise;
const connectOptions: mongoose.ConnectOptions = {
  dbName: 'todo_Nyitrai_Kamilla',
};
mongoose.connect(`${process.env.MONGO_URL}`, connectOptions);
mongoose.connection.on('error', (error) => console.log(error));

app.use('/', router());
