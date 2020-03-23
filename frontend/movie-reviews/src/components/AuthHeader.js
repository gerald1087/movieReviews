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
                        <NavLink to="/" style={{ margin: '2em' }}>Home </NavLink>
                        <NavLink to="/reviews" style={{ margin: '2em' }}>Current Movies </NavLink>
                        <NavLink to="/search" style={{ margin: '2em' }}>Seach </NavLink>
                        <button type="submit" id="logoutbutton" onClick={this.clickHandler.bind(this)} className="btn btn-primary">Logout</button>
                    </div>

                </div>
            </div>
        )
    }
}

export default withRouter(AuthHeader)