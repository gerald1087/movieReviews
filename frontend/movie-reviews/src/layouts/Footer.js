import React from 'react'
// import "./Footer.css"

class Footer extends React.Component {
    render() {
        return (
            <div style= {{backgroundColor: "rgb(250, 196, 114)", display: "flex"}}>
            <div className="footer" style={{backgroundColor: "rgb(250, 196, 114)", justifyContent: 'center'}}>
                <p>&copy; G/S 2020</p>
            </div>
            </div>
        )
    }
}

export default Footer