/* The MainRouter.js code will help render our custom React components with respect to
routes or locations in the application. */

import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './core/Home'
import Users from './user/Users'
import Signup from './user/Signup'

/* Switch component in React Router renders a route exclusively */
class MainRouter extends Component {
    render() {
        return (
        <div>
            <Switch>                                        
                <Route exact path="/" component={Home}/>
                <Route path="/users" component={Users}/>
                <Route path="/signup" component={Signup}/>
            </Switch>
        </div>
        )
    }
}
    
export default MainRouter