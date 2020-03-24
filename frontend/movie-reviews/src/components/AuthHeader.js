import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom'




class AuthHeader extends Component {

    clickHandler() {
        this.props.history.push('/')
        window.location.reload()
    }


    render() {
        return (
            <div className='header'>
                <div style={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'center', textAlign: 'center' }}>
                    <div>
                     <h4 style= {{backgroundColor: "rgb(266, 164, 57)", color: "rgb(250, 196, 114)", margin: 2, padding: 5}}>Your One Line Review Hub</h4>
                        <NavLink to="/" style={{ margin: '2em' }}>Home </NavLink>
                        <NavLink to="/reviews" style={{ margin: '2em' }}>Current Movies </NavLink>
                        <NavLink to="/search" style={{ margin: '2em' }}>New Movie Search </NavLink>
                        <button type="submit" id="logoutbutton" onClick={this.clickHandler.bind(this)} className="btn btn-primary">Logout</button>
                    </div>

                </div>
            </div>
        )
    }
}

export default withRouter(AuthHeader)