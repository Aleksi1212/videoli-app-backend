import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authenticationRoutes from './src/routes/authentication.routes';
import userRoutes from './src/routes/user.routes';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/auth', authenticationRoutes);
app.use('/user', userRoutes);

app.get('/', (req, res) => {
    res.send('service running');
});

app.listen(3000, () => {
    console.log(`hosting at ${process.env.HOST}`);
});
