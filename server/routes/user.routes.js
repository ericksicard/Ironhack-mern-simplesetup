import express from 'express'
import userCtrl from '../controllers/user.controller'

const router = express.Router()

// ASSIGNING THE CORRESPONDING CONTROLLER FUNCTION

router.route('/api/users')
    .get(userCtrl.list)                     // Listing users with GET
    .post(userCtrl.create)                  // Creating a new user with POST

router.route('/api/users/:userId')
    .get(userCtrl.read)                     // Fetching a user with GET
    .put(userCtrl.update)                   // Updating a user with PUT
    .delete(userCtrl.remove)                // Deleting a user with DELETE

router.param('userId', userCtrl.userByID)   // Loading a user by ID to read, update, or delete


export default router