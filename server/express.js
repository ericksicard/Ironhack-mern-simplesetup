import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import path from 'path'

import Template from './../template'
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'
import devBundle from './devBundle' // Loading Webpack middleware for development

// express app
const app = express()
devBundle.compile(app)  // Loading Webpack middleware for development


// Serving static files with Express
/* Express server handling the requests to static files such as CSS files, images,
or the bundled client-side JS from the dist folder
*/
const CURRENT_WORKING_DIR = process.cwd()
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))


// Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())
app.use('/', userRoutes)
app.use('/', authRoutes)
//Auth error handling for express-jwt
/* express-jwt throws an error named UnauthorizedError when the token cannot be validated
for some reason. We catch this error here to return a 401 status back to the requesting client.
*/
app.use( (err, req, res, next) => {
    if (err.name === 'UnauthorizedError')
    res.status(401).json({
        "error": err.name + ": " + err.message
    })
})


app.get('/', (req, res) => {
    res.status(200).send(Template())
})

export default app