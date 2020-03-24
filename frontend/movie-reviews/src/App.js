import React, { Component } from 'react';
import { Switch, Route, Router } from "react-router-dom";
import history from './layouts/history';
import './App.css';
import MovieSearch from "./MovieSearch"
import Home from "./layouts/Home";
import CreateReview from "./CreateReview"
import Movies from "./Movies"
import Movie from "./Movie"
import AllReviews from './AllReviews';
import Register from './authorization/Register'

class App extends Component {

  constructor() {
    super();

    this.state = {
      loggedIn: "Not_Logged_In",
      user: {}
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleSuccessfulRegistration = this.handleSuccessfulRegistration.bind(this);
  }

  handleSuccessfulRegistration(data) {
    this.props.history.push('/');
  }


  handleLogin(data) {
    this.setState({
      loggedIn: "Logged_In",
      user: data,
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
            <Route exact path={"/"} render={props => (<Home {...props} handleLogin={this.handleLogin} loggedIn={this.state.loggedIn} />)} />
            <Route exact path={"/search"} render={props => (<MovieSearch {...props} handleLogin={this.handleLogin} loggedIn={this.state.loggedIn} />)} />
            <Route exact path="/reviews" render={props => (<Movies {...props} results={this.state.results} user={this.state.user} loggedIn={this.state.loggedIn} />)} />
            <Route exact path="/reviews/:id" render={props => (<Movie {...props} results={this.state.results} user={this.state.user} loggedIn={this.state.loggedIn} />)} />
            <Route exact path="/listreviews/:id" render={props => (<AllReviews {...props} results={this.state.results} user={this.state.user} loggedIn={this.state.loggedIn} />)} />
            <Route exact path="/createreview/:id" render={props => (<CreateReview {...props} results={this.state.results} user={this.state.user} loggedIn={this.state.loggedIn} />)} />
            <Route exact path="/register" render={props => (<Register handleSuccessfulRegistration={this.handleSuccessfulRegistration} />)} />
          </Switch>
        </Router>
      </div>
    );
  }
}
export default App;
