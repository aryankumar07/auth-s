import express from 'express'
import authentication from './authentication'
import login from './login'
import Users from './user'
const router = express.Router()


authentication(router)
login(router)
Users(router)


export default router