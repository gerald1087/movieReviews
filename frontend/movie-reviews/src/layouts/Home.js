import React, { Component } from "react";
import Login from "../authorization/Login";
import Footer from "./Footer"
import Header from "../components/Header"

// import "./Home.css"

class Home extends Component {
    constructor(props) {
        super(props);

        this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    }

    handleSuccessfulLogin(data) {
        this.props.handleLogin(data);
        this.props.history.push('/reviews');
    }


    render() {
        return (
            <div>
                <Header/>
                <h1>Welcome to Movie Talk!</h1>
                <div className="login">
                    <h3>Login</h3>
                    <Login handleSuccessfulLogin={this.handleSuccessfulLogin} />
                </div>
                <div><p>
                    Dont't have an account? Click <a href='/register'>here</a>!
                    </p>
                    </div>
                <footer>
                    <Footer />
                </footer>
            </div>
        );
    }
}
export default Home;