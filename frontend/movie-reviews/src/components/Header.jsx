import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom'
import '../App.css';


class Header extends Component {


    render() {
        return (
            <div className='header'>
                <div style={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'center', textAlign: 'center' }}>
                    <div>
                        <NavLink to="/" style={{ margin: '2em' }}>Home </NavLink>
                        {/* <NavLink to="/register" style={{ margin: '2em' }}>Register</NavLink> */}
                    </div>

                </div>
            </div>
        )
    }
}

export default withRouter(Header)