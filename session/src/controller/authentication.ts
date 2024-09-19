import express from 'express'

import { getUserByEmail,createUser } from '../db/user'

import { random,authentication } from '../helpers/index' 



export const login = async (req : express.Request , res : express.Response)=>{
    try{
        const {email,password} = req.body

        if(!email || !password) {
            return res.status(400).send("send something")
        }

        let user = await getUserByEmail(email).select('+authentication.password +authentication.salt')

        if(!user){
            return res.status(500).send("no user exits")
        }

        const hashed = authentication(user.authentication.salt,password);

        if(hashed!==user.authentication.password){
            return res.status(400).send('password doesnot match')
        }


        const salt = random()
        const sessionToken = authentication(salt,user._id.toString())

        user.authentication.sessionToken = sessionToken

        user = await user.save()

        res.cookie('USER-AUTH',sessionToken,{ domain:'localhost', path : '/' })

        return res.status(200).json(user).end()


    }catch(e){
        console.log(e)
    }
}




export const register = async (req : express.Request , res : express.Response) => {
    try{

        const { username, email , password } = req.body
        
        if(!username || !email || !password) {
            return res.status(500).send("please give me everthing")
        }
        const existingUser = await getUserByEmail(email)

        if(existingUser){
            console.log(existingUser)
            return res.status(400).send("user already exist")
        }
        const salt = random()
        const user = await  createUser({
            username,
            email,
            authentication : {
                password : authentication(salt,password),
                salt,
            }
        })
        return res.status(200).json(user).end()
    }catch(e){
        console.log(e);
    }
}