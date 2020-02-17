import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'  // for redirection
import PropTypes from 'prop-types'
import auth from './../auth/auth-helper'
import {signin} from './api-auth.js'

import Card, {CardActions, CardContent} from 'material-ui/Card'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import Icon from 'material-ui/Icon'
import {withStyles} from 'material-ui/styles'

const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing.unit * 5,
    paddingBottom: theme.spacing.unit * 2
  },
  error: {
    verticalAlign: 'middle'
  },
  title: {
    marginTop: theme.spacing.unit * 2,
    color: theme.palette.openTitle
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing.unit * 2
  }
})

/* The Signin component is a form with only email and password fields for signing in.
This component is quite similar to the Signup component and will render at the '/signin'
path. The key difference is in the implementation of redirection after successful sign-in
and storing of the received JWT
*/
class Signin extends Component {
    state = {
        email: '',
        password: '',
        error: '',
        /*The redirectToReferrer should be set to true when the user successfully signs in
        after submitting the form and the received JWT is stored in the sessionStorage*/
        redirectToReferrer: false
    }

    clickSubmit = () => {
        const user = {
            email: this.state.email || undefined,
            password: this.state.password || undefined
        }

        signin(user).then((data) => {
            if (data.error) this.setState({error: data.error}) 
            else {
                //this method, defined in authhelper.js, stores the JWT and redirect afterwords
                auth.authenticate(data, () => {
                    this.setState({redirectToReferrer: true})
                })
            }
        })
    }

    handleChange = name => event => {
      this.setState({[name]: event.target.value})
    }

    render() {
        const {classes} = this.props
        const {from} = this.props.location.state || {
          from: {
            pathname: '/'
          }
        }
        const {redirectToReferrer} = this.state
        if (redirectToReferrer) {
          return (<Redirect to={from}/>)
        }

        return (
            <Card className={classes.card}>
                <CardContent>
                    <Typography type="headline" component="h2" className={classes.title}>
                      Sign In
                    </Typography>
                    <TextField id="email" type="email" label="Email" className={classes.textField} value={this.state.email} onChange={this.handleChange('email')} margin="normal"/><br/>
                    <TextField id="password" type="password" label="Password" className={classes.textField} value={this.state.password} onChange={this.handleChange('password')} margin="normal"/>
                    <br/> {
                      this.state.error && (<Typography component="p" color="error">
                        <Icon color="error" className={classes.error}>error</Icon>
                        {this.state.error}
                      </Typography>)
                    }
                </CardContent>
                    <CardActions>
                      <Button color="primary" variant="raised" onClick={this.clickSubmit} className={classes.submit}>Submit</Button>
                    </CardActions>
            </Card>
        )
    }
}

Signin.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Signin)