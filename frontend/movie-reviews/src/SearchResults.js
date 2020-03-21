import React, { Component } from 'react'
import axios from 'axios'
import Button from '@material-ui/core/Button';

export default class SearchResults extends Component {

    constructor(props) {
        super(props);
        this.state = {
            results: this.props.results
        }
    }

    handleClick(e) {
        e.preventDefault()
        var apiBaseUrl = "http://localhost:3005/api/";
        var payload = {
            title: this.props.title,
            image: this.props.image,
            year: this.props.year
        }
        console.log(payload)
        axios.post(apiBaseUrl + 'movie_reviews', payload)
            .then(response => {
                if (response.status === 200) {
                    alert('Success!')
                    window.location = '/reviews'
                }
            }).catch(error => {
                console.log(error);
            });
    }

    render() {

        return (
            <div>
                <div>
                    <div className="card" style={{width: '18rem'}}>
                        <img src={this.props.image} className="card-img-top" alt="could not load" />
                            <div className="card-body">
                                <h5 className="card-title">{this.props.title}</h5>
        <p className="card-text">{this.props.year}</p>
        <p className="card-text">{this.props.genre}</p>
        <p className="card-text">{this.props.plot}</p>
        <div>
                        <Button variant="outlined" color="secondary" type="submit" onClick={(event) => this.handleClick(event)} >
                            Add to List
                        </Button>
                    </div>
                            </div>
</div>
                    </div>
            </div>
        )
    }
}
