import '../App.css';
import React, { Component } from 'react'
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Register from '../pages/Register';
import { NavLink, Switch, Route } from 'react-router-dom';
import AuthService from './AuthService';
import { withRouter } from "react-router";

class Header extends Component {
    constructor() {
        super();
        this.Auth = new AuthService();
        this.logout = this.logout.bind(this);
    }
    logout() {
        this.Auth.logout();
        alert('logged out!');
        this.props.history.replace('/Login');
    }
    render() {

        return (
            <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <NavLink to="/search" className="navbar-brand">Home</NavLink>
                    
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <NavLink to="/reviews" className="navbar-brand">Reviews</NavLink>
                    
                    </nav>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav">
                            {/* <li className="nav-item">
                                <NavLink to="/Register" className="nav-link"> Register </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/Login" className="nav-link"> Login </NavLink>
                            </li> */}
                            <li className="nav-item">
                                <NavLink to="/Profile" className="nav-link"> Profile </NavLink>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick={this.logout}> Logout </a>
                            </li>
                        </ul>
                    </div>
                </nav>

                <Switch>
                    <Route path="/Login" component={Login} />
                    <Route path="/Profile" component={Profile} />
                    <Route path="/Register" component={Register} />
                </Switch>
            </div>
        );
    }
}

export default withRouter(Header);