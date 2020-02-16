/* The MainRouter.js code will help render our custom React components with respect to
routes or locations in the application. */

import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './core/Home'

/* Switch component in React Router renders a route exclusively */
class MainRouter extends Component {
    render() {
        return (
        <div>
            <Switch>                                        
                <Route exact path="/" component={Home}/>
            </Switch>
        </div>
        )
    }
}
    
export default MainRouter