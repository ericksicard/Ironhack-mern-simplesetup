import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import auth from './auth-helper'

/* PrivateRoute component will allow us to declare protected routes for the frontend
to restrict view access based on user auth.
   Components to be rendered in this PrivateRoute will only load when the user is
authenticated, otherwise the user will be redirected to the Signin component.
*/
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={ props => (
        auth.isAuthenticated() ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{
                pathname: '/signin',
                state: { from: props.location }
            }}/>
        )
    )}/>
)

export default PrivateRoute