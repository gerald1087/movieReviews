import React, { Component } from 'react';
import AuthService from '../components/AuthService';
import withAuth from '../components/withAuth';
import { getProfileData } from '../api/userApi';
import '../App.css';

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            loaded: false,
            name: '',
            username: '',
            email: '',
            password: '',
            gender:'',
            errors: {},
        };
    }
    
    componentDidMount() {
        const Auth = new AuthService()
        console.log(Auth.isAdmin())
        getProfileData()
            .then(profileData => {
                this.setState({
                    loaded: true,
                    ...profileData,
                });
            });
    }

    render() {
        if (!this.state.loaded) {
            return <div>Loading</div>;
        }
        return (
            <div className="container">
                <div className="jumbotron mt-5">
                    <div className="col-sm-4 mx-auto">
                        <h1 className="text-center">PROFILE</h1>
                    </div>
                    <table className="table col-md-4">
                        <tbody>
                            <tr>
                                <td style={{ "text-align": "left" }}><div class="form-group">
                                    <label for="inputName">Name</label>
                                    <input type="name" class="form-control" id="inputName" placeholder="Name" value={this.state.name} />
                                </div>
                                </td>
                        
                            </tr>
                            <tr>
                            <td style={{ "text-align": "left" }}><div class="form-group">
                                    <label for="inputUserName">Username</label>
                                    <input type="username" class="form-control" id="inputUserName" placeholder="Username" value={this.state.username} />
                                </div>
                                </td>
                            </tr>
                            <tr>
                            <td style={{ "text-align": "left" }}><div class="form-group">
                                    <label for="inputEmail">Email</label>
                                    <input type="email" class="form-control" id="inputEmail" placeholder="Email" value={this.state.email} />
                                </div>
                                </td>
                            </tr>
                            <tr>
                            <td style={{ "text-align": "left" }}><div class="form-group">
                                    <label for="inputGender">Gender</label>
                                    <input type="gender" class="form-control" id="inputGender" placeholder="gender" value={this.state.gender} />
                                </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button> View All Comments</button>
                </div>
            </div>
        );
    }
}

export default withAuth(Profile);