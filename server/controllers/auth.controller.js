import User from '../models/user.model'
import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
import config from './../../config/config'


// Sign-in
/*
1- The POST request object receives the email and password in req.body. This email is used
   to retrieve a matching user from the database.
2- The password authentication method defined in the UserSchema is used to verify the password
   received in the req.body from the client.
3- If the password is successfully verified, the JWT module is used to generate a JWT signed
   using a secret key and the user's _id value.
4- Then, the signed JWT is returned to the authenticated client along with user details.
   Optionally, we can also set the token to a cookie in the response object so it is available
   to the client side if cookies is the chosen form of JWT storage.
*/
const signin = (req, res) => {
    User.findOne( { "email": req.body.email }, (err, user) => {
            if ( err || !user )
            return res.status('401').json({
                error: "User not found"
            })

            if ( !user.authenticate(req.body.password) )
            return res.status('401').send({
                error: "email and password don't match."
            })

            const token = jwt.sign( { _id: user._id }, config.jwtSecret );

            res.cookie('t', token, {
                expire: new Date() + 9999
            })

            return res.json({
                token,
                user: { 
                    _id: user._id,
                    name: user.name,
                    email: user.email
                }
            })
        })
}


// Sign-out
/* This function clears the response cookie containing the signed JWT. This is an optional
endpoint and not really necessary for auth purposes if cookies are not used at all in the
frontend 
*/
const signout = (req, res) => {
    res.clearCookie('t')
    return res.status('200').json({
        message: 'signed out'
    })
}


// Requiring sign-in
/* This method uses express-js to verify that the incoming request has a valid JWT in the
Authorization header. If the token is valid, it appends the verified user's ID in an 'auth'
key to the request object, otherwise it throws an authentication error.
*/
const requireSignin = expressJwt({
    secret: config.jwtSecret,
    userProperty: 'auth'
})


// Authorizing signed in users
/* For some of the protected routes such as Update and Delete, on top of checking for
authentication we also want to make sure the requesting user is only updating or deleting
their own user information.
   The hasAuthorization function checks if the authenticated user is the same as the user
being updated or deleted before the corresponding CRUD controller function is allowed to
proceed.
   - req.auth object is populated by express-jwt in requireSignin after authentication verification
   - req.profile is populated by the userByID function in the user.controller.js
*/
const hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!authorized) 
    return res.status('403').json({
        error: "User is not authorized"
    })

    next();
}


export default { signin, signout, requireSignin, hasAuthorization }