import express from 'express'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()

// ASSIGNING THE CORRESPONDING CONTROLLER FUNCTION

/********** Change for Passport implementation ***********/
router.route('/auth/signin')
    .post(authCtrl.signin)      // POST request to authenticate the user with email and password

router.route('/auth/signout')
    .get(authCtrl.signout)      // GET request to clear the cookie containing a JWT that was set on the response object after sign-in


export default router