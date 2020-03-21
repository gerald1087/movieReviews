import React, { Component } from 'react';
import axios from 'axios';
import CommentBox from './CommentBox';


class Comment extends React.Component {
  constructor() {
    super();
    this.state = {
      item: '',
      CommentBox: [],
      comment_date: '',
      user_id: '',
      moviereview_id: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this)
    this.updateState = this.updateState.bind(this)
    }

    updateState(event, key) {
    this.setState({
      [key]: event.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state)
    const newItem = {
      name: this.state.item,
      complete: false,
    };
    this.setState({
      item: '',
      CommentBox: [
        ...this.state.CommentBox,
        newItem
      ]
    })

    var apiBaseUrl = "http://localhost:3005/api/";
        var payload = {
            id: this.state.id,
            user_id: this.state.user_id,
            moviereview_id: this.state.moviereview_id,
            comment_date: this.state.comment_date
        }
        console.log(payload)
        axios.post(apiBaseUrl + "comments", payload.id)
            .then(function (response) {
                console.log(response);
                alert("Comment post failed!")
            }).catch(function (error) {
                console.log(error);
            });
            console.log("values", this.state.user_id, this.state.moviereview_id, this.state.comment_date);
  }
  componentDidMount() {
        }
  

  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>
              Leave a Comment
              <input type='text' id='item' name='item' 
              value={this.state.item}
              onChange={event => this.updateState(event, 'item')}
              />
            </label>
            <input type='submit' value='Add Item'></input>
          </div>
        </form>
        <CommentBox CommentBox={this.state.CommentBox} 
        />

      </div>
    );
  }
}


export default Comment;
