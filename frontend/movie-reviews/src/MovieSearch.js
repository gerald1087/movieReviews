import React, { Component } from 'react';
import axios from 'axios';
import SearchResults from './SearchResults'
import AuthHeader from './components/AuthHeader';
import Footer from './layouts/Footer'


export default class MovieSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movie: "",
            results: [],
            showResults:false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault();
        let searchString = this.state.movie
        let urlEncodedSearchString = encodeURIComponent(searchString);
        axios.get("https://www.omdbapi.com/?apikey=fe66f057&t=" + urlEncodedSearchString)
            .then(response => {
                console.log(response);
                this.setState({
                    results: response.data
                })
                console.log(this.state.results)

            }).catch(error => {
                console.log(error);
            });
    };


    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
            showResults: true
        })
    }
    render() {
        return (
            <div>
                <div>
                    <AuthHeader />
                </div>
                <form style= {{backgroundColor: "rgb(250, 196, 114)"}}>
                    <div className="form-group" style= {{backgroundColor: "rgb(250, 196, 114)"}}>
                        <label htmlFor="movieSearch">Movie Search</label>
                        <input type="text" name="movie" className="form-control" id="movieSearchBar" value={this.state.movie} onChange={this.handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={(event) => this.handleSubmit(event)} >Submit</button>
                
                {this.state.results, this.state.showResults &&
                    <SearchResults results={this.state.results} title={this.state.results.Title} image={this.state.results.Poster} year={this.state.results.Year} genre={this.state.results.Genre} plot={this.state.results.Plot} />
                }
                </form>
                <footer>
                    <Footer />
                </footer>

            </div>
        )
    }
}

