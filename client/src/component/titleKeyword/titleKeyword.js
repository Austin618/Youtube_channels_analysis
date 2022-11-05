import React, { useState } from "react";

import "./titleKeyword.css";

import axios from "axios";
import Navbar from "../navbar/navbar";
import {Link} from "react-router-dom";



/* Component for the Home page */
class TitleKeyword extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            channelId: window.location.pathname.slice(14,),
        };
    }

    

    render() {
        return (
            <div>
                <Navbar />

                <div className="linkPosition">
                    <Link to={`/channel/${this.state.channelId}`}>
                        <div className="backButton">
                            <button>Back</button>
                        </div>
                    </Link>
                </div>

            </div>
        );
    }
}

export default TitleKeyword;
