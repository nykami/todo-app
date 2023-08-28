import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import http from 'http';
import mongoose from 'mongoose';
import router from './router';

const PORT = 8080;
const MONGO_URL =
  'mongodb+srv://emanueldrusu:Mongowebgurus22@wgclusterlearn.gr0pdlo.mongodb.net/?retryWrites=true&w=majority';
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(PORT, () =>
  console.log('Server running on http://localhost:8080/')
);

mongoose.Promise = Promise;
const connectOptions: mongoose.ConnectOptions = {
  dbName: 'todo_Nyitrai_Kamilla',
};
mongoose.connect(MONGO_URL, connectOptions);
mongoose.connection.on('error', (error) => console.log(error));

app.use('/', router());
