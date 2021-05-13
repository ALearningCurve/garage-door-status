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
        console.log(this.props.user.uid)
        const doorsRef = this.props.db.collection("doors").where("uid", "==", this.props.user.uid);

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
                {/* <div className="grid grid-flow-col auto-cols-auto auto-rows-auto content-end"> */}
                <div className="flex flex-wrap items-center justify-center">

                    {doors.map((door) => 
                        <DoorDetails {...door} db={this.props.db} key={door.id.toString()}/>
                    )}
                </div>
                <div className="flex flex-col my-2 items-center">
                    <sub className="DoorList-subtitle text-center dark:text-gray-400 text-gray-500">Tracking {this.state.doors.length} doors</sub>
                </div>
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