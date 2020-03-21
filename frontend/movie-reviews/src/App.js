import React, {Component} from 'react';
import { Switch, Route, Router } from "react-router-dom";
import history from './layouts/history';

import MovieSearch from "./MovieSearch"
import Home from "./layouts/Home";
import MovieReviews from "./MoviesReviews"

class App extends Component {

  constructor() {
    super();

    this.state = {
      loggedIn: "Not_Logged_In",
      user: {}
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }


  handleLogin(data) {
    this.setState({
      loggedIn: "Logged_In",
      user: data
    })
  }

  handleLogout() {
    this.setState({
      loggedIn: "Not_Logged_In",
      user: {}
    })
    this.props.history.push('/')
  }

  render() {
    return (

      <div className="App">
   <Router history={history}>        
   <Switch>
          <Route 
          exact 
          path={"/"} 
          render={props => (
          <Home {...props} handleLogin={this.handleLogin} loggedIn={this.state.loggedIn} />)} />
          <Route exact 
          path={"/search"} 
          render={props => (
          <MovieSearch {...props} handleLogin={this.handleLogin} loggedIn={this.state.loggedIn} />)} />
          <Route exact path="/reviews" render={props => (<MovieReviews {...props} user={this.state.user} loggedIn={this.state.loggedIn}/>)} />
        </Switch>
        </Router>
      </div>
    );
  }
}
export default App;
