import React, { useState } from "react";

import "./home.css";

import axios from "axios";
import Navbar from "../navbar/navbar";
import PlaylistInfo from "../playlistInfo/playlistInfo";

import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

import { getChannelInfo} from "../../actions/searchChannel";
import Channel from "../channel/channel";
import {Link} from "react-router-dom";

/* Component for the Home page */
class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            // option: ""
            // str: "",
            // // channelId: "",
            // resultFound: false,
            // channelInfo: null,
            // playlistInfo: []
        };
    }


    // componentDidMount(){
    //     axios
    //         .get('/api/tests')
    //         .then(({ data })=> {
    //             console.log(data);
    //             console.log(data[0]);
    //             this.setState({
    //                 str: data[0].testMsg
    //             });
    //         })
    //         .catch((err)=> {console.log(error);})
    // }
    //
    // handleInputChange = event => {
    //     const target = event.target;
    //     const value = target.value;
    //     const name = target.name;
    //     this.setState({
    //       [name]: value
    //     });
    //   }
    //
    // searchChannel= () => {
    //     getChannelInfo("channels", this.state.channelId).then(json => {
    //         this.setState({channelInfo:json})
    //         getChannelInfo("playlists", this.state.channelId).then(json => {
    //             this.setState({playlistInfo:json})
    //             getChannelInfo("videos", this.state.channelId).then(json => {
    //                 this.setState({videos:json,
    //                     resultFound:true,
    //                     channelId:""
    //                 })
    //               })
    //           })
    //       }).catch(error => {
    //         console.log(error);
    //         this.setState({
    //             channelId:""
    //         })
    //       });
    // }
    // sortTable = () => {
    //     if (this.state.option === "") {
    //         return;
    //     }
    //     console.log(this.state.option)
    //     console.log("sort algorithm running!")
    // }
    //
    // handleChange(e){
    //     this.setState({
    //         option: e.target.value
    //     })
    // }

    render() {
        return (
            <div>
                <Navbar />
                <div className="welcome">
                    <h1>Welcome to Youtube Channel Analysis Tool.</h1>
                    <h1>Please click type the Channel ID in the search bar to start.</h1><hr />
                    <h2>For example:</h2>
                    <h2>Google developers: UC_x5XG1OV2P6uZZ5FSM9Ttw</h2>
                    <h2>Amazon: UCd6MoB9NC6uYN2grvUNT-Zg</h2>
                    <h2>University of Toronto: UCWdY1GyPhp2TFpS82rFEOkQ</h2>
                </div>

                {/*<select value={this.state.option} onChange={this.handleChange.bind(this)}>*/}
                {/*    {this.sortTable()}*/}
                {/*    /!*<p>Choose order here: </p>*!/*/}
                {/*    <option value="" disabled hidden>Choose sort by:</option>*/}
                {/*    <option value="Video Count: High to Low">Video Count: High to Low</option>*/}
                {/*    <option value="Publish Time: New to Old">Publish Time: New to Old</option>*/}
                {/*</select>*/}

                {/*<InputBase */}
                {/*    sx={{ ml: "40%", width:"20%"}}*/}
                {/*    placeholder="Please enter Channel ID..."*/}
                {/*    value={this.state.channelId}*/}
                {/*    onChange={this.handleInputChange}*/}
                {/*    name="channelId"*/}
                {/*/>*/}
                {/*<Link to={`/channel/${this.state.channelId}`}>*/}
                {/*    <IconButton type="button" className="searchBox" sx={{ p: '10px' }} aria-label="search" onClick={()=>this.searchChannel()}>*/}
                {/*        <SearchIcon />*/}
                {/*    </IconButton>*/}
                {/*</Link>*/}
                {/*<h1>{ this.state.str }</h1>*/}
                {/*<Channel resultFound={this.state.resultFound} channelInfo={this.state.channelInfo} />*/}
                {/*<PlaylistInfo resultFound={this.state.resultFound} playlistInfo={this.state.playlistInfo}/>*/}
            </div>
        );
    }
}

export default Home;
