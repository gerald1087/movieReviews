import React, { Component } from 'react'

export default class Movies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: []
        }
    }

    render() {
        return (
            <div>
                <div>
                    <div className="card" style={{width: '18rem'}}>
                        <img src="..." className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text"></p>
                                {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                            </div>
</div>
                    </div>
            </div>
        )
    }
}
