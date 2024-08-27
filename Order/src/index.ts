import express from 'express'
import {connect} from "./config/database";
import {PORT} from './utils/dotenvVariables'
import routes from "./routes";
import cookieParser from 'cookie-parser';
const app=express();
app.use(express.json());
connect();

app.use(cookieParser());
app.use(`/api`,routes)


app.listen(PORT,()=>{
    console.log(`app running on port ${PORT}`)
})


