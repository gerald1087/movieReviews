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
                <h1 style= {{fontFamily: "serif", color: "red", fontSize: "60px"}}> Line Please</h1>
                <h3 style= {{fontFamily: "serif", color: "rgb(194, 121, 11)", fontSize: "25px"}}> Your Best One Sentence Reviews</h3>
                <img src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto/gigs/107984671/original/9e23a721064b22483516eb42285a20aac93ac8be/creative-messaging-for-the-special-ocassion.png" style={{height: "150px", width: "180px"}} className="App-logo" alt="logo" />
                <div className="login"  style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'}}>
        <br />
        <br />
        <br />
        <br />
                    <h3>Login</h3>
                    <Login handleSuccessfulLogin={this.handleSuccessfulLogin} />
                </div>
                <div id="bottom"><p>
                    Dont't have an account? Click <a href='/register'>here</a>!
                    </p>
                    </div>
                    
                <footer style= {{position: "bottom"}}>
                    <Footer />
                </footer>
               
            </div>
        );
    }
}
export default Home;