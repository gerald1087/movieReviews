import React, { Component } from 'react'

export default class CommentBox extends React.Component {
    constructor() {
        super();
        this.state = {
          user_id: '',
          moviereview_id: '',
        };
    }
    componentDidMount() {
        var apiBaseUrl = "http://localhost:3005/api/comments";
            var payload = {
                id: this.state.id,
                user_id: this.state.user_id,
                moviereview_id: this.state.movierewview_id,
                comment_date: this.state.comment_date,
            }
            console.log(payload)
            axios.get(apiBaseUrl + "moviereview", payload.moviereview_id)
                .then(function (response) {
                    console.log(response);
                }).catch(function (error) {
                    console.log(error);
                });
                console.log("values", this.state.user_id, this.state.moviereview_id, this.state.comment_date);
      }
    render() {
        return (
            <div>
             
            </div>
        )
    }
}

