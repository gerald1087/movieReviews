import React, { Component } from 'react'
import axios from 'axios'
import history from './layouts/history';
import Button from '@material-ui/core/Button';

export default class MoviesReviews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: []
        }
    }

    componentDidMount() {
        axios.get("http://localhost:3005/api/movie_reviews/")
            .then(({ data }) => {
                this.setState({
                    results: data
                });
            });
    }

    render() {
        return (
            <div>
                <div>
                    {this.state.results.map((result, index) => {
                        return (
                            <div key={index} className="card" style={{ width: '18rem' }}>
                                <img src={result.image} className="card-img-top" alt="..." />
                                <div className="card-body">

                        <h5 className="card-title">{result.genre}</h5>
                                    <p className="card-text"></p>

                        <h5 className="card-title">{result.title}</h5>
                        <p className="card-text">{result.year}</p>

                                    {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                                    <Button size="small"onClick={() => history.push('/search')}>Go Back</Button>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>
        )
    }
}
