import React, { Component } from 'react'
import firebase from '../firebase.js'; 
import LoginForm from "./LoginForm";
export default class LoginHandler extends Component {
    provider; 
    constructor(props) {
        super(props)

        this.provider = new firebase.auth.GoogleAuthProvider()
        
        this.state = {
            "user":null,
            "email":"",
            "password":"",
            "error":null
        }
    }
    
    componentDidMount() {
        this.props.auth.onAuthStateChanged(user => { 
            this.setState({
                "user":user
            })
        })
    }

    onSignIn = (email, password) => {
        console.log("here")
        if (!email || !password) {
            alert("You must enter something before submitting")
            return;
        }
        console.log(`password "${password}"::email "${email}"`)

        this.props.auth.signInWithEmailAndPassword(email.trim(), password.trim())
            .then((userCredential) => {
                
            })
            .catch((error) => {
                // var errorCode = error.code;
                // var errorMessage = error.message;
                console.error(error)
                this.setState({
                    "error":error
                })
            });
    }

    onSignOut = () => {
        this.props.auth.signOut()
    }

    render() {
        const isLoggedIn = !!this.state.user;
        const user = this.state.user
        return (
            <div className="flex flex-col mt-20 items-center">
            { isLoggedIn 
                ? 
                <div className="flex flex-col mt-20 items-center">
                    <p className="text-green-300"> Loggged in as <span className="font-bold">{user.displayName}</span>. </p>
                    <button onClick={this.onSignOut}
                    className="text-green-400 font-semibold underline mx-1"> Click to sign out </button>
                </div>
                : 
                <LoginForm error={this.state.error} onSubmit={this.onSignIn} />
            }
            </div>
        )
    }
}
