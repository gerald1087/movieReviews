import React, { Component } from "react";
import axios from 'axios';

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

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };

  
        this.handleClick = this.handleClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })

    }


    

    handleClick(e) {
        e.preventDefault()
        var apiBaseUrl = "http://localhost:3005/api/";
        var payload = {
            email: this.state.email,
            password: this.state.password,
        }
        console.log(payload)
        axios.post(apiBaseUrl + 'login', payload)
            .then(response => {
                if (response.statusText === 'OK') {
                    this.props.handleSuccessfulLogin(response.data)
                    alert('Welcome!')
                }

            }).catch(error => {
                console.log(error);
            });
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <form className={classes.root} noValidate autoComplete="off">
                    <div>
                        <TextField id="outlined-basic" label="Email Address" variant="outlined" name="email" type="email" className="form-control" value={this.state.email} onChange={this.handleChange} />
                    </div>

                    <div>
                        <TextField id="outlined-basic" label="Password" variant="outlined" name="password" type="password" className="form-control" value={this.state.password} onChange={this.handleChange} />
                    </div>
                    <br />
                    <div>
                        <Button variant="outlined" color="secondary" type="submit" onClick={(event) => this.handleClick(event)} >
                            Login
                        </Button>
                    </div>
                </form>
            </div>
        )
    }

}
export default withStyles(useStyles)(Login)