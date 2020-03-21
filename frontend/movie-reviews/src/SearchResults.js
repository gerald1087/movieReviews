import React, { Component } from 'react'

export default class SearchResults extends Component {

    constructor(props) {
        super(props);
        this.state = {
            results: this.props.results
        }
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

<button> to "Create Review Host"</button>
                                {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                            </div>
</div>
                    </div>
            </div>
        )
    }
}