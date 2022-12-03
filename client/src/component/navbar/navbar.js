import React, {useRef, useState} from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./navbar.css";

import axios from "axios";
import {Link} from "react-router-dom";


/* Component for the navigation bar */
class Navbar extends React.Component {

    constructor(props) {
        super(props);
        this.navRef = React.createRef();

        this.state = {
            channelId: "",
        };
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    showNavbar = () => {
        this.navRef.current.classList.toggle("responsive_nav");
    };

    render() {
        return (
            <header>
                <Link to="/"><button className="logoBox">Youtube Analysis</button></Link>
                <nav ref={this.navRef}>
                    {/*<Link to="/"><button className="buttonBox">Home</button></Link>*/}
                    {/*<Link to="/Channel"><button className="buttonBox">Channel</button></Link>*/}
                    <input
                        className="searchBox"
                        placeholder=" Please enter Channel ID..."
                        value={this.state.channelId}
                        onChange={this.handleInputChange}
                        name="channelId"
                    />
                    <Link to={`/channel/${this.state.channelId}`}>
                        <button type="" className="buttonBox" disabled={!this.state.channelId}>
                            Search
                            {/*<SearchIcon />*/}
                        </button>
                    </Link>
                    <button
                        className="nav-btn nav-close-btn"
                        onClick={()=>{this.showNavbar()}}>
                        <FaTimes />
                    </button>
                </nav>
                <button className="nav-btn" onClick={()=>{this.showNavbar()}}>
                    <FaBars />
                </button>
            </header>
        );
    }
}

export default Navbar;
