import React from 'react';
import './App.css';
import { Switch, Route, Router } from "react-router-dom";
import Header from './components/Header'
import MovieSearch from "./MovieSearch"
import Comment from "./components/Comment"
// import CommentBox from "./components/CommentBox"
import MoviesReviews from './MoviesReviews';
import Header from './components/Header';
import Axios from 'axios';

//material ui
// import { withStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';


export default class Review extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // results: this.props.results
        }
    }
    componentDidMount() {
       
        // Axios.get (`http://localhost:3005/api/movie_reviews/${this.props.movie_reviews.id}`)
    }
    render() { 
        return (
            <div>
           <Header></Header>
                    <div className="card" style={{width: '18rem'}}>
                        <img src={this.props.image} className="card-img-top" alt="could not load" />
                            <div className="card-body">
                                <h5 className="card-title">{this.props.title}</h5>
                                <p className="card-text">{this.props.year}</p>
                                <p className="card-text">{this.props.genre}</p>
                                <p className="card-text">{this.props.plot}</p>
                                <div></div>

                {/* <MoviesReviews></MoviesReviews> */}
                <Comment></Comment>
               

                    <Button size="small"onClick={() => history.push('/search')}>Go Home</Button>
                    </div>
                    </div>
                    </div>
        
    )
    
}
}


