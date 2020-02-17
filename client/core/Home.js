
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import Card, {CardContent, CardMedia} from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import seashellImg from './../assets/images/seashell.jpg'
import {Link} from 'react-router-dom'

// Style declarations
const styles = theme => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        marginTop: theme.spacing.unit * 5
    },
    title: {
        padding:`${theme.spacing.unit * 3}px ${theme.spacing.unit * 2.5}px ${theme.spacing.unit * 2}px`,
        color: theme.palette.text.secondary
    },
    media: {
        minHeight: 330
    }
})


// Component definition -- we will compose the content and behavior of the component.
class Home extends Component {
    render() {
        const {classes} = this.props
        return (
            <div>
                <Card className = { classes.card }>
                    <Typography type = "headline" component = 'h2' className = { classes.title }>
                        Home Page
                    </Typography>
                    <CardMedia className = { classes.media } image = { seashellImg } title = 'Unicorn Shells'/>
                    <CardContent>
                        <Typography type = 'body1' component='p'>
                            Welcome to the MERN Skeleton home page!!
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        )
    }
}


// PropTypes validation -- validates the required injection of style declarations as props to the component
Home.propTypes = {
    classes: PropTypes.object.isRequired
    }


// Export component
/*
  1- Export the component with the defined styles passed in using withStyles from Material-UI
  2- Using withStyles like this creates a Higher-order component(HOC) that has access to the defined style objects as props.
*/
export default withStyles(styles)(Home)