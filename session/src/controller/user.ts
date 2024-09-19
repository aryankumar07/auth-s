import express from 'express'
import { getUsers, deleteUserById, getUserById } from '../db/user'

export const getAllUser = async (req : express.Request , res : express.Response)=>{
    try{
        const users = await getUsers()
        res.status(200).json(users)
    }catch(e){
        console.log(e)
    }
}

export const deleteUser = async (req : express.Request , res : express.Response)=>{
    try{
        const {id} = req.params

        const deletedUser = await deleteUserById(id)

        res.status(200).json(deletedUser)

    }catch(e){
        console.log(e)
    }
}

export const updateUser = async (req:express.Request , res : express.Response)=>{
    const {id} = req.params
    const {newname}  = req.body

    const user = await getUserById(id)

    user.username = newname

    user.save()

    return res.status(200).json(user).end()
}