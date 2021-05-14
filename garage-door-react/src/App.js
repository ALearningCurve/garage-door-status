import './App.css';
import DoorsView from './components/DoorsView';
import LoginHandler from "./components/LoginHandler";
import firebase from './firebase.js'; 
import React, { Component } from 'react'
import { getToken, onMessageListener } from './firebase';
import {Button, Row, Col, Toast} from 'react-bootstrap';

export default class App extends Component {
  db; auth;
  
  constructor(props) {
    super(props)
  
    this.state = {
        user: null,
        show: false
    }

    this.initFirebase();
  }
  
  initFirebase = () => {
    // Firestore
    this.db = firebase.firestore();
    this.db.settings({
        timestampsInSnapshots: true
    });
    
    //  Auth
    this.auth = firebase.auth()

    // Push notifcations
    getToken()

    onMessageListener().then(message => {
      this.setState({
        show:true
      });
    }).catch(err => console.log('failed: ', err));
  }
  
  componentDidMount() {
    this.auth.onAuthStateChanged(user => { 
      this.setState({
        "user":user
      })
    })
  }

  renderToast() {
    const show = this.state.show;
    return (
      <div>
        <Toast onClose={() => this.setState({show:false})} show={show} delay={3000} autohide animation style={{
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
        </Toast>
        <Button onClick={() => this.setState({show:true})}>Show Toast</Button>
      </div>
    )
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
      </div>
      </div>
    );
  }
}

