import React from 'react'

class DoorDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render() {
        return (
            <li key={this.props.id.toString()}>
                {this.props.name} is {this.props.open ? "open ⚠️" : "closed 🔐"}
            </li>   
        );
    }
}
export default DoorDetails;