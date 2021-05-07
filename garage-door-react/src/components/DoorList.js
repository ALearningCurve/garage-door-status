import React from 'react'
import DoorDetails from "./DoorDetails";
import firebase from '../firebase.js'; 

class DoorList extends React.Component {
    unsubscribe;
    
    constructor(props) {
        super(props);
        this.state = { }
    }

    componentDidMount() {
        this.getDoors()
    }

    componentWillUnmount() {
        this.unsubscribe && this.unsubscribe();
    }

    getDoors = () => {
        
        const doorsRef = this.props.db.collection("doors")
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

    render() {
        const error = this.state.error
        if (error) {
            return (
                <div>
                    <h5>An error has occurred, the status of the doors could not be retrieved.</h5>
                </div>
            )
        }
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