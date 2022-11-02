import React, {useRef, useState} from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./navbar.css";

import axios from "axios";


/* Component for the Home page */
class Navbar extends React.Component {

    constructor(props) {
        super(props);
        this.navRef = React.createRef();
    }


    showNavbar = () => {
        this.navRef.current.classList.toggle("responsive_nav");
    };

    render() {

        return (
            <header>
                <h1>Youtube Data Analysis</h1>
                <nav ref={this.navRef}>
                    <a href="/#">Home</a>
                    <a href="/#">Search</a>
                    <a href="/#">Popular</a>
                    <a href="/#">Login</a>
                    <a href="/#">Register</a>
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
