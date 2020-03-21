import React from 'react';
import axios from 'axios';

import Header from "./Header"
import { Link, Route, Router } from 'react-router-dom';
// import LinkButton from '/components/LinkButton';
// // import PropTypes from 'prop-types'
// import { Button, View, Text } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import history from './history';
import Footer from "./Footer"

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = (theme => ({

    root: {
        background: "#F5C3C2",
        width: 400,
        color: "#E73895"
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
}));

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    handleUpdateClick() {
        this.props.history.push('/updateprofile')
    }

    handleOrdersClick(e) {
        e.preventDefault()
        axios.get(`http://localhost:3001/api/orders/${this.props.user.id}`)
            .then(response => {
                console.log(response)
            }).catch(error => {
                console.log(error);
            });
    }


    handleDeleteClick(e) {
        e.preventDefault()
        axios.delete(`http://localhost:3001/api/deleteprofile/${this.props.user.id}`)
            .then(response => {
                alert("profile successfully deleted")
                this.props.history.push('/')
                window.location.reload()
                console.log(response.data, "deleted message")
            }

            ).catch(error => {
                console.log(error);
            });
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <header>
                    <Header />
                </header>
                <div>
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                {this.props.user.name}
                            </Typography>
                            <Typography className={classes.title} gutterBottom>
                                {this.props.user.address_line1}
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                {this.props.user.city}
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                {this.props.user.state}
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                {this.props.user.zip}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small"onClick={() => history.push('/products')}>Thanks for shopping with us</Button>
                        </CardActions>
                    </Card>
                </div>
                <br />
                <Button variant="outlined" color="secondary" type="submit" onClick={(event) => this.handleOrdersClick(event)} >
                    View Orders
                        </Button>
                <Button variant="outlined" color="secondary" type="submit" onClick={(event) => this.handleDeleteClick(event)} >
                    Delete Profile
                        </Button>
                        <Button variant="outlined" color="secondary" type="submit" onClick={(event) => this.handleUpdateClick(event)} >
                    Update Profile
                        </Button>
                <footer>
                    <Footer />
                </footer>
            </div>
        )
    }
}

export default withStyles(useStyles)(Profile)