import express from 'express'

import { getAllUser, deleteUser,updateUser } from '../controller/user'
import { isAuthenticated, isOwner } from '../middlewares/isauthenticated'

export default (router : express.Router) => {
    router.get('/users',isAuthenticated , getAllUser)
    router.delete('/users/:id',isAuthenticated ,isOwner,deleteUser)
    router.post('/users/:id', isAuthenticated, isOwner , updateUser)
}