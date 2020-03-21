import React, { Component } from "react";
import Register from "../authorization/Register";
import Login from "../authorization/Login";
import Footer from "./Footer"

// import "./Home.css"

class Home extends Component {
    constructor(props) {
        super(props);

        this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
        this.handleSuccessfulRegistration = this.handleSuccessfulRegistration.bind(this);
    }

    handleSuccessfulLogin(data) {
        this.props.handleLogin(data);
        this.props.history.push('/search');
    }

    handleSuccessfulRegistration(data) {
        this.props.history.push('/');
    }


    render() {
        return (

            <div>
                <h1>Status: {this.props.loggedIn}</h1>
                <div className="register">
                    <h3>Register</h3>
                    <Register handleSuccessfulRegistration={this.handleSuccessfulRegistration} />
                </div>
                <div className="login">
                    <h3>Login</h3>
                    <Login handleSuccessfulLogin={this.handleSuccessfulLogin} />
                </div>
                <footer>
                    <Footer />
                </footer>
            </div>
        );
    }
}
export default Home;