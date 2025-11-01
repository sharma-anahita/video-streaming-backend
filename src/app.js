import express from 'express'  
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()
app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials :true,  
}))
app.use(express.json({
    limit:"16kb"
}))
app.use(express.urlencoded({
    extended:true,
    limit:"16kb"
}))
app.use(cookieParser()) //gave us two way access to cookies i.e. in request and response both
//middlewares likhe pehle

import userRouter from './routes/user.routes.js'

//routes declaration
app.use('/api/v1/users',userRouter)


export { app }