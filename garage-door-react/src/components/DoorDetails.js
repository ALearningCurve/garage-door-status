import React from 'react'

class DoorDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    getFormattedDate = () => {
        if (this.props.lastUpdated) {
            return this.props.lastUpdated.toDate().toLocaleString();
        } else {
            return "sometime ago"
        }
    }

    render() {
        return (
            <div key={this.props.id.toString()} className="m-5 flex-initial min-w-300 dark:bg-gray-700">
                <div className="max-w-sm rounded overflow-hidden shadow-lg ">
                    <div className={`${this.props.open ? "from-red-600 to-pink-500" : "from-green-600 to-blue-500"} text-center bg-gradient-to-r w-full py-10 block`}>
                        <h3 className="font-bold text-xl mb-2 px-6 px-4 text-gray-200" >{this.props.name}</h3>
                    </div>
                    <div className="px-6 py-4">
                        {/* <div className="font-bold text-xl mb-2"></div> */}
                        <p className="text-gray-700 text-base text-center dark:text-gray-400">
                            This door is currently {this.props.open ? "open" : "closed"} as of <span className="font-semibold font-lg">{this.getFormattedDate()}</span>. 
                        </p>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                        <span className="inline-block bg-gray-200 dark:bg-gray-400 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{this.props.open ? "open" : "closed"}</span>
                    </div>
                </div>
            </div>
            // <li key={this.props.id.toString()}>
            //     {this.props.name} is {this.props.open ? "open ⚠️" : "closed 🔐"}
            // </li>   
        );
    }
}
export default DoorDetails;