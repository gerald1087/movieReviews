import React, { Component } from 'react'
import axios from 'axios';

class CommentBox extends React.Component {
    constructor() {
        super();
        this.state = {
    
        };
    }
        componentDidMount() {
            //haven't tested api route yet. backend broken
            axios.get("http://localhost:3001/api/comments/users/:id")
            .then(({ data }) => {
                console.log(data)
                this.setState(
                    {
                       
                    });
            });
    }

        
    
   render() {
       return (
           <div>
            
           </div>
       )
   }
}

export default CommentBox