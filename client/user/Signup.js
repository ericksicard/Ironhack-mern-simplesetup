import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {create} from './api-user.js'

import Card, {CardActions, CardContent} from 'material-ui/Card'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import Icon from 'material-ui/Icon'
import {withStyles} from 'material-ui/styles'
import Dialog, {DialogActions, DialogContent, DialogContentText, DialogTitle} from 'material-ui/Dialog'


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

/* The Signup component presents a form with name, email, and password fields to the user
for sign-up at the '/signup' path
*/
class Signup extends Component {
    /* state initialization with empty input field values, empty error message, and set
    the dialog open variable to false */
    state = {
        name: '',
        password: '',
        email: '',
        open: false,
        error: ''
    }

    // takes the new value entered in the input field and sets it to state
    handleChange = name => event => {
      this.setState({[name]: event.target.value})
    }

    /* clickSubmit is called when the form is submitted. It takes the input values
    from state and calls the create fetch method to sign up the user with the backend. Then,
    depending on the response from the server, either an error message is shown or a success
    dialog is shown.
    */
    clickSubmit = () => {
      const user = {
        name: this.state.name || undefined,
        email: this.state.email || undefined,
        password: this.state.password || undefined
      }
      create(user)
      .then((data) => {
        if (data.error) this.setState({error: data.error})
        else this.setState({error: '', open: true})
      })
    }

  render() {
    const {classes} = this.props
    return (<div>
      <Card className={classes.card}>
        <CardContent>
          <Typography type="headline" component="h2" className={classes.title}>
            Sign Up
          </Typography>
          <TextField id="name" label="Name" className={classes.textField} value={this.state.name} onChange={this.handleChange('name')} margin="normal"/><br/>
          <TextField id="email" type="email" label="Email" className={classes.textField} value={this.state.email} onChange={this.handleChange('email')} margin="normal"/><br/>
          <TextField id="password" type="password" label="Password" className={classes.textField} value={this.state.password} onChange={this.handleChange('password')} margin="normal"/>
          <br/> {
            this.state.error && (<Typography component="p" color="error">
              <Icon color="error" className={classes.error}>error</Icon>
              {this.state.error}</Typography>)
          }
        </CardContent>
        <CardActions>
          <Button color="primary" variant="raised" onClick={this.clickSubmit} className={classes.submit}>Submit</Button>
        </CardActions>
      </Card>
      <Dialog open={this.state.open} disableBackdropClick={true}>
        <DialogTitle>New Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            New account successfully created.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/signin">
            <Button color="primary" autoFocus="autoFocus" variant="raised">
              Sign In
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>)
  }
}

// PropTypes validation -- validates the required injection of style declarations as props to the component
Signup.propTypes = {
  classes: PropTypes.object.isRequired
}

// Export component
/*
  1- Export the component with the defined styles passed in using withStyles from Material-UI
  2- Using withStyles like this creates a Higher-order component(HOC) that has access to the defined style objects as props.
*/
export default withStyles(styles)(Signup)