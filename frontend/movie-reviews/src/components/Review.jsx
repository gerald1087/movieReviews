import React from 'react';
import './App.css';
import { Switch, Route, Router } from "react-router-dom";
import MovieSearch from "./MovieSearch"
import Comment from "./components/Comment"
import CommentBox from "./components/CommentBox"

//material ui
// import { withStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: this.props.results
        }
    }
    componentDidMount() {
       
    }
    render() { 
        return (
           
            <div className="card" style={{width: '18rem'}}>
            <img src={this.props.image} className="card-img-top" alt="could not load" />
                <div className="card-body">
                    <h5 className="card-title">{this.props.title}</h5>
                    <p className="card-text">{this.props.year}</p>
                    <p className="card-text">{this.props.genre}</p>
                    <p className="card-text">{this.props.plot}</p>

                    This section is for the comment input line

                    This section is for the comment box.

                    <Button size="small"onClick={() => history.push('/profile')}>Go Home</Button>
                    </div>
                    </div>
        
    )
    
}
}

export default Review;