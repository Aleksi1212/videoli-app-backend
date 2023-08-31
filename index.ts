import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import errorCatcher from './src/middleware/errorCatcher';
import { newSession } from './src/config/auth.config';

import authenticationRoutes from './src/routes/authentication.routes';
import userRoutes from './src/routes/user.routes';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(newSession);

app.use('/auth', authenticationRoutes);
app.use('/user', userRoutes);

app.use(errorCatcher);

app.get('/', (req, res) => {
    res.send('service running');
});

app.listen(3000, () => {
    console.log(`hosting at ${process.env.HOST}`);
});
