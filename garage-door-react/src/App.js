import './App.css';
import DoorsView from './components/DoorsView';
import LoginHandler from "./components/LoginHandler";
import firebase from './firebase.js'; 
import React, { Component } from 'react'
const { snackbar } = require('tailwind-toast')

export default class App extends Component {
  db; auth; messaging;
  
  constructor(props) {
    super(props)
  
    this.state = {
        user: null,
        message: null,
        tokenFound:false
    }
  }

  initFirestore = () => {
    this.db = firebase.firestore();
    this.db.settings({
        timestampsInSnapshots: true
    });
    
    this.auth = firebase.auth()
    this.messaging = firebase.messaging();

    this.initPushNotifications();
  }

  getToken = (setTokenFound) => {
    return this.messaging.getToken({vapidKey: 'BIqs6mgtQs48IbRLWE-5qIibkWHtV1F-ANu3WlDbrMuiMwQxP6GVVQmDHB5Ip_CQENMuJMCiZe9DzRA8jsDKHfw'}).then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        this.setState({
          tokenFound:true
        })
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log('No registration token available. Request permission to generate one.');
        this.setState({
          tokenFound:false
        })
        // shows on the UI that permission is required 
      }
    }).catch((err) => {
      console.error('An error occurred while retrieving token. ', err);
      // catch error while creating client token
    });
  }

  onMessageListener = () =>
    new Promise((resolve) => {
      this.messaging.onMessage((payload) => {
        resolve(payload);
      });
  });

  initPushNotifications = () => {
    this.getToken(()=>{this.setState({token:true})});

    this.onMessageListener()
      .then(message => {
        this.setState({
          message:true
        })
      .catch(err => {
        alert("failed: " + err)
      })
    })
  }

  createNotification = (title="Title", body="Body", action="") => {

    let snackBar = snackbar()
    snackBar
      .success(title, body, action)
      .with(this.createNotificationOptions("warning"))
      .addButtons(
        { x: () => {
            snackBar.hide()
          }
        }
      )
      .show()
  }

  createNotificationOptions = (type="") => {
    var color;
    switch (type) {
      case "success":
        color = "green";
        break;
      case "error":
        color = "red";
        break;
      case "warning":
        color = "yellow";
        break;
      default:
        color = "blue";
        break;
    }

    return {
      shape: 'pill',
      duration: 4000,
      speed: 700,
      positionX: 'center',
      positionY: 'top',
      "color": color,
      tone: 800,
      fontColor: color,
      fontTone: 200
    }
  }

  renderPushNotificationButton = () => {
    return (
      <div>
        <button onClick={() => this.createNotification()}>Show Toast</button>
        <div className="flex flex-col my-2 items-center">
          { this.state.tokenFound 
            ?  
            <sub className="text-center dark:text-green-400 text-green-500">
              notifications enabled :)
            </sub>
            :
            <sub className="text-center dark:text-red-400 text-red-500">
              notifications disabled!
            </sub>
          }
        </div>
      </div>
    )
  }
  
  componentDidMount() {
    this.initFirestore();
    
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
    const auth = this.auth;
    return (
      <div className="flex items-center justify-center h-screen">
      <div>
        {user && 
          <DoorsView db={db} user={user}/>
        }
        {auth && 
          <LoginHandler auth={auth}/>
        }
        {this.renderPushNotificationButton()}
      </div>
      </div>
    );
  }
}

