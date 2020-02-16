import express from 'express'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()

// ASSIGNING THE CORRESPONDING CONTROLLER FUNCTION

router.route('/api/users')
    .get(userCtrl.list)                                                         // Listing users with GET
    .post(userCtrl.create)                                                      // Creating a new user with POST

router.route('/api/users/:userId')
    // Protecting user routes
    .get(authCtrl.requireSignin, userCtrl.read)                                 // Fetching a user with GET
    .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)    // Updating a user with PUT
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove) // Deleting a user with DELETE

router.param('userId', userCtrl.userByID)   // Loading a user by ID to read, update, or delete


export default router