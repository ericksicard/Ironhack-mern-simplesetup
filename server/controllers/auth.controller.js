import User from '../models/user.model'
import jwt from 'jsonwebtoken'
//import expressJwt from 'express-jwt'
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
frontend */
const signout = (req, res) => {
    res.clearCookie('t')
    return res.status('200').json({
        message: 'signed out'
    })
}





export default { signin, signout }
//export default { signin, signout, requireSignin, hasAuthorization }