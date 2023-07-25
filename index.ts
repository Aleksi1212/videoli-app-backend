import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv'
dotenv.config()

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
    res.send('hello world');
});

app.listen(3000, () => {
    console.log('hosting at http://localhost:3000');
});
