import React, { useState } from "react";

import "./home.css";

import axios from "axios";
import Navbar from "../navbar/navbar";
import PlaylistInfo from "../playlistInfo/playlistInfo";

import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

import { getChannelInfo} from "../../actions/searchChannel";

/* Component for the Home page */
class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            str: "",
            channelId:"",
            resultFound:false,
            channelInfo:null,
            playlistInfo:[]
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

    handleInputChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
          [name]: value
        });
      }
    
    searchChannel= () => {
        getChannelInfo(this.state.channelId,"channels").then(json => {
            this.setState({channelInfo:json})
            getChannelInfo(this.state.channelId,"playlists").then(json => {
                this.setState({playlistInfo:json})
                getChannelInfo(this.state.channelId,"videos").then(json => {
                    this.setState({videos:json,
                        resultFound:true,
                        channelId:""
                    })
                  })
              })
          }).catch(error => {
            console.log(error);
            this.setState({
                channelId:""
            })
          });
    }
    

    render() {
        return (
            <div>
                <Navbar />
                <InputBase 
                    sx={{ ml: "40%", width:"20%"}}
                    placeholder="Please enter Channel ID..."
                    value={this.state.channelId}
                    onChange={this.handleInputChange}
                    name="channelId"
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={()=>this.searchChannel()}>
                    <SearchIcon />
                </IconButton>
                <h1>{ this.state.str }</h1>
                <PlaylistInfo resultFound={this.state.resultFound} playlistInfo={this.state.playlistInfo}></PlaylistInfo>
            </div>
        );
    }
}

export default Home;
