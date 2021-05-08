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
            <div className="flex flex-col-reverse mt-20 items-center">
            { isLoggedIn 
                ? 
                <div>
                    <span className="text-green-300"> Loggged in as <span className="font-bold">{user.displayName}</span>. </span>
                    <button onClick={this.onSignOut}
                    className="text-green-400 font-semibold underline mx-1"> Click to sign out </button>
                </div>
                : 
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                onClick={this.onSignIn}>Sign in with Google</button>
            }
            </div>
        )
    }
}
