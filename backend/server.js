import express from "express" ;
import dotenv from "dotenv";
import { connectDB } from "./db/connectdb.js";
import { router as grievanceRouter} from "./route/Grievances.route.js";
import { router as loginRouter } from "./route/Login.route.js";
import cors from 'cors';
import session from "express-session";
import passport from "passport";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({
    credentials : true,
    origin : 'http://localhost:5173'
}))

app.use(session({
    secret : 'my-session-secret',
    resave : false,
    saveUninitialized : false
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/grievances',grievanceRouter);

app.use('/api/login',loginRouter);

app.get('/',(req,res)=>{
    res.send('Server started');
})

const PORT = process.env.PORT || 1000 ; 

app.listen(PORT,()=>{
    connectDB();
    console.log(`Server started at : http://localhost:${PORT}`)
})