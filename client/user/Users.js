import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {list} from './api-user.js'

import {withStyles} from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import List, {ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import ArrowForward from 'material-ui-icons/ArrowForward'
import Person from 'material-ui-icons/Person'


// Style declarations
const styles = theme => ({
  root: theme.mixins.gutters({
    padding: theme.spacing.unit,
    margin: theme.spacing.unit * 5
  }),
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
    color: theme.palette.openTitle
  }
})

// Users component
/* shows the names of all the users
fetched from the database, and links each name to the user profile. This component can be
viewed by any visitor to the application and will render at the path '/users':
*/
class Users extends Component {
    state = { users: [] }           // we first initialize the state with an empty array of users

    componentDidMount = () => {
        list()
        .then( data => {
            if (data.error) console.log(data.error)
            else this.setState( {users: data} )
        })
    }

    render() {
        const {classes} = this.props
        return (
          <Paper className={classes.root} elevation={4}>
            <Typography type="title" className={classes.title}>
              All Users
            </Typography>
            <List dense>
             {this.state.users.map((item, i) => {
              return <Link to={"/user/" + item._id} key={i}>
                        <ListItem button>
                          <ListItemAvatar>
                            <Avatar>
                              <Person/>
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary={item.name}/>
                          <ListItemSecondaryAction>
                          <IconButton>
                              <ArrowForward/>
                          </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                     </Link>
                   })
                 }
            </List>
          </Paper>
        )
    }
}

// PropTypes validation -- validates the required injection of style declarations as props to the component
Users.propTypes = {
  classes: PropTypes.object.isRequired
}

// Export component
/*
  1- Export the component with the defined styles passed in using withStyles from Material-UI
  2- Using withStyles like this creates a Higher-order component(HOC) that has access to the defined style objects as props.
*/
export default withStyles(styles)(Users)