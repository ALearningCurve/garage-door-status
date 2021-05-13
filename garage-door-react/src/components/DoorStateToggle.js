import React, { Component } from 'react'

export default class DoorStateToggle extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }

    
    sendSignalRequest = () => {
        const doorRef = this.props.db.collection('doors').doc(this.props.id)
        doorRef.update({
            needsSignal:true
        });
    }

    sendUpdateRequest = () => {
        const doorRef = this.props.db.collection('doors').doc(this.props.id)
        doorRef.update({
            needsUpdate:true
        });
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
                    className="bg-green-500 hover:bg-green-700 text-white font-bold rounded py-1 px-1 text-xs mx-1" 
                    onClick={() => {this.sendUpdateRequest()}}
                >
                    Refresh
                </button>
                <button 
                    className="bg-red-500 hover:bg-red-700 text-white font-bold rounded py-1 px-1 text-xs mx-1" 
                    onClick={() => {this.sendSignalRequest()}}
                >
                    Send Signal
                </button>
            </div>
        )
    }
}
