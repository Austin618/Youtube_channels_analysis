import React, { useState } from "react";

import "./home.css";

import axios from "axios";


/* Component for the Home page */
class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            str: ""
        };
    }

    componentDidMount(){
        axios
            .get('/api/tests')
            .then(({ data })=> {
                console.log(data);
                console.log(data[0]);
                this.setState({
                    str: data[0].testMsg
                });
            })
            .catch((err)=> {})
    }

    render() {

        return (
            <div>
                <h1>{ this.state.str }</h1>
            </div>
        );
    }
}

export default Home;
