import './App.css';
import DoorsView from './components/DoorsView';
import LoginHandler from "./components/LoginHandler";
import firebase from './firebase.js'; 
import React, { Component } from 'react'
import {Button, Row, Col, Toast} from 'react-bootstrap';
const { toast, snackbar } = require('tailwind-toast')

export default class App extends Component {
  db; auth; messaging;
  
  constructor(props) {
    super(props)
  
    this.state = {
        user: null,
        message: null,
        token:false
    }

    this.initFirestore();
  }

  initFirestore = () => {
    this.db = firebase.firestore();
    this.db.settings({
        timestampsInSnapshots: true
    });
    
    this.auth = firebase.auth()
    this.messaging = firebase.messaging();

    this.initPushNotifcations();
  }

  getToken = (setTokenFound) => {
    return this.messaging.getToken({vapidKey: 'GENERATED_MESSAGING_KEY'}).then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log('No registration token available. Request permission to generate one.');
        setTokenFound(false);
        // shows on the UI that permission is required 
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // catch error while creating client token
    });
  }
  onMessageListener = () =>
    new Promise((resolve) => {
      this.messaging.onMessage((payload) => {
        resolve(payload);
      });
  });

  initPushNotifcations = () => {
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

  createMessage = () => {
    this.setState({
      message:true
    })
    toast().default('Title', 'Message!').show()
  }

  renderPushNotifaction = () => {
    return (
      <div>
        {/* <Toast onClose={() => this.setState({message:null}) } show={this.state.message} delay={3000} autohide animation style={{
          position: 'absolute',
          top: 20,
          right: 20,
        }}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded mr-2"
              alt=""
            />
            <strong className="mr-auto">Notification</strong>
            <small>12 mins ago</small>
          </Toast.Header>
          <Toast.Body>There are some new updates that you might love!</Toast.Body>
        </Toast> */}
        <Button onClick={() => this.createMessage()}>Show Toast</Button>
      </div>
    )
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
      <div className="flex items-center justify-center h-screen">
      <div>
        {user && 
          <DoorsView db={db} user={user}/>
        }
        <LoginHandler auth={this.auth}/>
        {this.renderPushNotifaction()}
      </div>
      </div>
    );
  }
}

