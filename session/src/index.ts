import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import http from 'http'
import mongoose  from 'mongoose'
import router from './router/index'


const app = express();
app.use(cors({
    credentials:true,
}))
app.use(compression())
app.use(bodyParser.json())
app.use(cookieParser())

const server = http.createServer(app)

server.listen(3000,()=>{
    console.log('sever is running on localhost 3000')
})

const mongo_url = 'mongodb+srv://learn:mongo@cluster0.anstn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect(mongo_url)
.then((e)=>console.log('connected to mongo'))
.catch((e)=>console.log(e))

app.use('/api',router)


