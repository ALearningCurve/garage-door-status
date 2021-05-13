import React, { Component } from 'react'

export default class LoginForm extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            password: "",
            email:""
        }
    }


    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value    
        });
    }
        
    render() {
        return (
            <div className="flex flex-wrap items-center flex-col justify-center">
                <form  className="flex items-center flex-col justify-center">
                    <label className="dark:text-gray-400 text-black ">
                        Email:
                        <input
                            name="email" type="text"
                            value={this.state.email}
                            onChange={this.handleInputChange} 
                            className="dark:bg-gray-600 rounded ml-5 m-1 border-2 dark:border-0 px-2"

                            />
                    </label>
                    <br/>
                    <label className="dark:text-gray-400 text-black">
                        Password:
                        <input
                            name="password" type="password"
                            value={this.state.password}
                            onChange={this.handleInputChange} 
                            className="dark:bg-gray-600 rounded ml-5 m-1 border-2 dark:border-0 px-2"
                            />
                    </label>
                    <br />
                </form>
                {/* show errors */}
                {this.props.error && 
                    <p className="dark:text-red-400 text-red-800 text-center">
                        There were errors in the form. <br/> {this.props.error.code}: {this.props.error.message}
                    </p>
                }
                <div>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8" 
                    onClick={() => {this.props.onSubmit(this.state.email, this.state.password)}} type="submit">Submit</button>                

                </div>
            </div>
        )
    }
}
