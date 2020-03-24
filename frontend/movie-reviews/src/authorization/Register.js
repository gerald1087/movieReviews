import React, { Component } from "react";
import axios from 'axios'
import Header from "../components/Header"
import Footer from '../layouts/Footer'

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = (theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: 200,
        },
    },
}));

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            username: '',
            email: '',
            password: '',
            age: '',
            gender: ''
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleClick(e) {
        e.preventDefault();
        var apiBaseUrl = "http://localhost:3005/api/";
        var payload = {
            name: this.state.name,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            age: this.state.age,
            is_admin: false,
            gender: this.state.gender
        }
        console.log(payload)
        axios.post(apiBaseUrl + "register", payload)

            .then(response => {
                if (response.statusText === 'OK') {
                    this.props.handleSuccessfulRegistration(response.data)
                    alert('Registration Successful!')
                    window.location.reload()
                }
            }).catch(error => {
                console.log(error);
            });

        console.log("values", this.state.name, this.state.email);
    }


    render() {

        const { classes } = this.props;
        return (
            <div>
                <header>
                <Header/>
                </header>
                <div>
                    <h1>
                        Register Here! 
                    </h1>
                    <br />
                    <h3>
                    (It's Free)
                    </h3>
                    <br />
                </div>
                <div id="regi">
                <form className={classes.root} noValidate autoComplete="off">
                    <div>
                        <TextField id="outlined-basic" label="Full Name" variant="outlined" name="name" type="name" className="form-control" value={this.state.name} onChange={this.handleChange} />
                    </div>
                    <div>
                        <TextField id="outlined-basic" label="Username" variant="outlined" name="username" type="username" className="form-control" value={this.state.username} onChange={this.handleChange} />
                    </div>

                    <div>
                        <TextField id="outlined-basic" label="Email Address" variant="outlined" name="email" type="email" className="form-control" value={this.state.email} onChange={this.handleChange} />
                    </div>

                    <div>
                        <TextField id="outlined-basic" label="Password" variant="outlined" name="password" type="password" className="form-control" value={this.state.password} onChange={this.handleChange} />
                    </div>
                    <div>
                        <TextField id="outlined-basic" label="Age" variant="outlined" name="age" type="age" className="form-control" value={this.state.age} onChange={this.handleChange} />
                    </div>
                    <div>
                        <TextField id="outlined-basic" label="Gender" variant="outlined" name="gender" type="gender" className="form-control" value={this.state.gender} onChange={this.handleChange} />
                    </div>
                    <br />
                    <div>
                        <Button variant="outlined" color="secondary" type="submit" onClick={(event) => this.handleClick(event)} >
                            Register
                    </Button>
                    </div>
                </form>
                </div>
                <footer>
                    <Footer />
                </footer>
            </div>
        )
    }
}

export default withStyles(useStyles)(Register)