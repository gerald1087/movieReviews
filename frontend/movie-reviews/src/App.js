import React from 'react';
import './App.css';
import { Switch, Route, Router } from "react-router-dom";
import MovieSearch from "./MovieSearch"
import Comment from "./components/Comment"
import CommentBox from "./components/CommentBox"
import history from './history';

function App() {
  return (
    // <div className="App">
    <Router history={history}>    
       <Switch>
        <Route path="/MovieSearch" component={MovieSearch} />
      
       </Switch>
       </Router>
  )
}

export default App;