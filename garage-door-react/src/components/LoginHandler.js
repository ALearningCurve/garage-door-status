import React, { Component } from 'react'
import firebase from '../firebase.js'; 

export default class LoginHandler extends Component {
    provider; 
    constructor(props) {
        super(props)

        this.provider = new firebase.auth.GoogleAuthProvider()
        
        this.state = {
            "user":null
        }
    }
    
    componentDidMount() {
        this.props.auth.onAuthStateChanged(user => { 
            this.setState({
                "user":user
            })
        })
    }

    onSignIn = () => {
        this.props.auth.signInWithPopup(this.provider)
    }

    onSignOut = () => {
        this.props.auth.signOut()
    }

    render() {
        const isLoggedIn = !!this.state.user;
        const user = this.state.user
        return (
            <div>
            { isLoggedIn 
                ? 
                <div>
                    <h5> Welcome {user.displayName}!</h5>
                    <button className="btn btn-danger" onClick={this.onSignOut}>Sign out</button>
                </div>
                : 
                <button className="btn btn-primary" onClick={this.onSignIn}>Sign in with Google</button>
            }
            </div>
        )
    }
}
