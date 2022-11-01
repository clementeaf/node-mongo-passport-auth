import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from "dotenv";
import authroute from './routes/auth.routes';
import passport from 'passport';
import passportMiddleware from './middlewares/passport';
import specialRoute from './routes/private.routes';

dotenv.config();

//initialization
const app = express();

// settings
app.set('port', process.env.PORT || 3001);

//middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(passport.initialize());
passport.use(passportMiddleware);


//routes
app.get('/', (req, res) => {
    res.send(`Api is at http://localhost:${app.get('port')}`);
});

app.use(authroute);
app.use(specialRoute)

export default app;