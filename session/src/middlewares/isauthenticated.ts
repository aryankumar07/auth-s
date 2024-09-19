import express from 'express'
import { getUserBySessionToken } from '../db/user'
import { get, merge } from 'lodash'

export const isOwner = async (req : express.Request , res : express.Response, next : express.NextFunction)=>{
    try{
        const {id} = req.params
        // const fetchuer = get(req,'identity')
        // console.log(fetchuer)
        const userId = get(req,'identity._id') as string

        if(!userId){
            res.status(400).send('no such user exist')
        }

        if(userId.toString()!==id){
            res.status(400).send('cannot delete other users')
        }

        return next()
    }catch(e){

    }
}


export const isAuthenticated = async (req : express.Request,res : express.Response ,next : express.NextFunction)=>{
    try{
        const sessionToken  = req.cookies['USER-AUTH']

        if(!sessionToken){
            return res.status(500).send("no session token provided")
        }

        const user = await getUserBySessionToken(sessionToken)

        if(!user){
            return res.status(500).send('no user found with this session token')
        }

        merge(req , { identity : user })

        const fetchuer = get(req,'identity')

        console.log(fetchuer)


        return next()
    }catch(e){
        console.log(e)
    }
}