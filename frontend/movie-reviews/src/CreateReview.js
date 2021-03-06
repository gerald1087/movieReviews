import React, { Component } from 'react'
import axios from "axios"
import AuthHeader from "./components/AuthHeader"
import Footer from './layouts/Footer'

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = (theme => ({
    root: {
        '& > *': {
            width: 500,
            height: 1000
        },
    },
}));

class CreateReview extends Component {

    constructor(props) {
        super(props);
        this.state = {
            review: ''
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
        const apiBaseUrl = "http://localhost:3005/api/";
        let payload = {
            comment: this.state.review,
            moviereview_id: this.props.match.params.id,
            user_id: this.props.user.id
        }
        console.log(payload)
        axios.post(apiBaseUrl + "comments", payload)
            .then(response => {
                console.log(response)
                alert('Thanks for your review')
                window.location = '/reviews'
            }).catch(error => {
                console.log(error);
            });
    }
    compondentDidMount() {
    
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                {/* <div> */}
                    <AuthHeader />
                {/* </div> */}
                <form className={classes.root} noValidate autoComplete="off" style= {{backgroundColor: "rgb(250, 196, 114)", display: "flex"}}>
                    <TextField id="outlined-basic" label="What's Your One-Line Take?" variant="outlined" name="review" type="review" value={this.state.review} onChange={this.handleChange} />
                    <Button variant="outlined" color="secondary" type="submit" onClick={(event) => this.handleClick(event)} style= {{backgroundColor: "orange", height: "55px", width: "20px"}}>
                        Post
                    </Button></form>
                
                {/* <footer> */}
                    <Footer />
                {/* </footer> */}
            </div>
        )
    }
}

export default withStyles(useStyles)(CreateReview)