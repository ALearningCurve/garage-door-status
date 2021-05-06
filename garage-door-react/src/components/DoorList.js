import React from 'react'
import DoorDetails from "./DoorDetails";

class DoorList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { doors:null}
        this.getDoors();
    }

    getDoors = () => {
        var response = [
            {
                id:0,
                name:"Left Door",
                open:true
            },
            {
                id:1,
                name:"Right Door",
                open:false
            }
        ]
        this.setState({
            "doors":response
        })
    }

    render() {
        console.log(this.state)

        const doors = this.state.doors;
        return (
            <div>
                <h1>Hello, world!</h1>
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