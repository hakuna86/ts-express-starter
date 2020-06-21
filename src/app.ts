import express from "express";
import bodyParser from "body-parser";
import path from "path";
import compression from "compression";
import { stream } from './util/logger';
import morgan from 'morgan';

const app = express();
app.set("port", process.env.PORT || 3000);
app.set('env', process.env.NODE_ENV || 'production');

app.use(morgan(process.env.NODE_ENV ? 'dev' : 'combined', {stream}));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);
app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello World!');
});

app.get('/test', (req: express.Request, res: express.Response) => {
  res.send('Hello World!');
});

export default app;