import React from 'react';
import axios from 'axios';
import MoviesReviews from './MoviesReviews';
import Movie from './Movie';
import AuthHeader from './components/AuthHeader'
import Footer from './layouts/Footer'

import { Switch, Route } from 'react-router-dom'


class Movies extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            results: []
        }
    }

    componentDidMount() {
        axios.get("http://localhost:3005/api/movie_reviews/")
            .then(({ data }) => {
                console.log(data)
                this.setState(
                    {
                        results: data
                    });
            });
    }

    render() {
        let resultsJSX = this.state.results.map((result, index) => {

            return <MoviesReviews key={index} {...result} user={this.state.user} />
        });

        return (
            <div>
                <header>
                    <AuthHeader />
                </header>
                <div className="Movie" style= {{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: "20", backgroundColor: "rgb(250, 196, 114)"}}>
                    <Switch>
                        <Route exact path={'/reviews'} render={() => resultsJSX} />
                        <Route path={'/reviews/:id'} render={props => (<Movie {...props} user={this.state.user} />)} />
                    </Switch>
                </div>
                {/* <footer>
                    <Footer />
                </footer> */}
            </div>
        )
    }
}

export default Movies