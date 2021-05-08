import './App.css';
import DoorsView from './components/DoorsView';
import LoginHandler from "./components/LoginHandler";
import firebase from './firebase.js'; 
import React, { Component } from 'react'

export default class App extends Component {
  db; auth;
  
  constructor(props) {
    super(props)
  
    this.state = {
       user: null
    }

    this.db = firebase.firestore();
    this.db.settings({
        timestampsInSnapshots: true
    });
    
    this.auth = firebase.auth()
    
    // this.auth.useEmulator('http://localhost:9099/', { disableWarnings: true });
    // this.db.useEmulator('localhost', 8080);
  }
  
  componentDidMount() {
    this.auth.onAuthStateChanged(user => { 
      this.setState({
        "user":user
      })
    })
  }

  changeAuthState = (user) => {
    this.setState({
      "user":user
    })
  }
  
  render() {
    const db = this.db;
    const user = this.state.user;
    return (
      <div id="main-container">
        <LoginHandler auth={this.auth}/>
        {user && 
          <DoorsView db={db} user={user}/>
        }
      </div>
    );
  }
}

