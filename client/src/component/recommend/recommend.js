import React, { useState } from "react";

import "./recommend.css";

import axios from "axios";
import Navbar from "../navbar/navbar";



/* Component for the Home page */
class Recommend extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        };
    }

    

    render() {
        return (
            <div>
                <Navbar />

            </div>
        );
    }
}

export default Recommend;
