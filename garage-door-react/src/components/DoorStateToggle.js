import React, { Component } from 'react'

export default class DoorStateToggle extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }

    
    sendSignal = () => {
        const doorsRef = this.props.db.ref('doors/' + this.props.id).set({
            username: name,
            email: email,
            profile_picture : imageUrl
        });

        this.unsubscribe = doorsRef.onSnapshot('value', (querySnapshot) => {
            const items = [];
            this.snapshotSubscription = querySnapshot.forEach((doc) => {
                items.push({...doc.data(), id:doc.id})
            })
            this.setState({doors:items}, ()=>{console.table(this.state.doors)})
        }, error =>{
            console.error(error)
            this.setState({"error":error})
        });
    }

    needsUpdate = () => {
        
    }
    
    render() {
        return (
            <div>
                {/* Button to toggle state */}
                {/* <button
                className="text-red-800 dark:text-red-400">
                    Send Signal
                </button> */}
                <button 
                    className="bg-red-500 hover:bg-red-700 text-white font-bold rounded py-1 px-1 " 
                    onClick={() => {this.sendSignal()}}
                >
                    Send Signal
                </button>
            </div>
        )
    }
}
