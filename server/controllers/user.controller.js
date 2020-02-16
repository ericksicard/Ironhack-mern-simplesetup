import User from '../models/user.model'
import _ from 'lodash'
import errorHandler from './../helpers/dbErrorHandler'

// CONTROLLER METHODS

// Creating a new user
const create = (req, res, next) => {
    const user = new User (req.body)
    user.save( (err, result) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
        res.status(200).json({
            message:"Successfuly signed up!"
        })
    })
}

// Listing all users ( returning name, email, updated & created )
const list = (req, res) => {
    User
        .find((err, users) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler.getErrorMessage(err)
                })
            }
            res.json(users)
        })
        .select('name email updated created')
}

// Loading a user by ID to Read, Update, or Delete
const userByID = (req, res, next, id) => {
    User.findById(id).exec( (err, user) => {
        if( err || !user )
        return res.status('400').json({
            error: "User not found"
        })
        /* If a matching user is found in the database,
        the user object is appended to the request object
        in the profile key */
        req.profile = user;
        /* Then, the next() middleware is used to propagate
        control to the next relevant controller function */
        next();
    })
}

// Reading
/* This function retrieves the user details from req.profile and removes
sensitive information before sending the user object in the response
to the requesting client*/
const read = (req, res) => {
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json( req.profile )
}

// Updating
/* The update function retrieves the user details from req.profile, then
uses the lodash module to extend and merge the changes that came in the
request body to update the user data. */
const update = (req, res, next) => {
    let user = req.profile;
    user = _.extend(user, req.body);
    user.updated = Date.now()
    user.save( (err) =>{
        if (err)
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json( user );
    })
}

// Deleting
/* The remove function retrieves the user from req.profile and uses the
remove() query to delete the user from the database. */
const remove = (req, res, next) => {
    let user = req.profile;
    user.remove( (err, deletedUser) => {
        if (err)
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
        deletedUser.hashed_password = undefined;
        deletedUser.salt = undefined;
        res.json( deletedUser )
    })
}


export default { create, userByID, read, list, remove, update }