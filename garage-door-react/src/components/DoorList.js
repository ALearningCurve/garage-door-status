import React from 'react'
import DoorDetails from "./DoorDetails";
import firebase from '../firebase.js'; 

class DoorList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { }
    }

    componentDidMount() {
        this.getDoors()
    }

    getDoors = () => {
        const db = firebase.firestore();
        db.settings({
            timestampsInSnapshots: true
        });
        const doorsRef = db.collection("doors")
        doorsRef.onSnapshot('value', (querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push({...doc.data(), id:doc.id})
            })
            this.setState({doors:items})
        });
        // var response = [
        //     {
        //         id:0,
        //         name:"Left Door",
        //         open:true
        //     },
        //     {
        //         id:1,
        //         name:"Right Door",
        //         open:false
        //     }
        // ]
        // this.setState({
        //     "doors":response
        // })
    }

    render() {
        const doors = this.state.doors;
        return (
            <div>
                { doors == null ?
                    this.displayLoading() :
                    this.displayDoors()
                }
            </div>
        );
    }

    displayDoors = () => {
        var doors = this.state.doors;
        return (
            <div>
                <ul>
                    {doors.map((door) => 
                        <DoorDetails {...door} key={door.id.toString()}/>
                    )}
                </ul>
                <sub className="DoorList-subtitle">Tracking {this.state.doors.length} doors</sub>
            </div>
        )
    }

    displayLoading = () => {
        return (
            <p>Fetching Doors</p>
        )
    }
}

export default DoorList;