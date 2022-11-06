import React, { useState } from "react";

import "./playlistInfo.css";

import axios from "axios";

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import {getChannelInfo} from "../../actions/searchChannel";
import Navbar from "../navbar/navbar";
import Select from '@mui/material/Select';
import {Link} from "react-router-dom";
/* Component for the playlist info */
class PlaylistInfo extends React.Component{



    constructor(props) {
        super(props);

        this.state = {
            channelId: window.location.pathname.slice(11,),
            playListInfo: null,

            show: false,
            sortBy: '',
        };
    }

    componentDidMount() {
        console.log(this.state.channelId)
        this.loadData()
    }

    loadData() {
        console.log(this.state.channelId)
        getChannelInfo("playlists", this.state.channelId).then(json => {
            this.setState({playListInfo: json})
            console.log(json)
        }).catch(error => {
            console.log(error)
        });
    }

    showMore = () => {
        this.setState({
            show: true
        })
    }
    showLess = () => {
        this.setState({
            show: false
        })
    }

    handleChange = (event) => {
        this.setState({
            sortBy: event.target.value
        })
        // setSortBy(event.target.value);
    };
    render(){
        if (!this.state.playListInfo) {
            return (
                <div>
                    <Navbar />
                    <h1>Loading...</h1>
                </div>
            )
        }
        // need to be check in API
        if (this.state.playListInfo.length === 0) {
            return (
                <div>
                    <Navbar />
                    <h1>Data Error!</h1>
                </div>
            )
        }


        const StyledTableRow = styled(TableRow)(({ theme }) => ({
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
            // hide last border
            '&:last-child td, &:last-child th': {
                border: 0,
            },
            }));
        const StyledTableCell = styled(TableCell)(({ theme }) => ({
            [`&.${tableCellClasses.head}`]: {
                backgroundColor: theme.palette.common.black,
                color: theme.palette.common.white,
            },
            [`&.${tableCellClasses.body}`]: {
                fontSize: 14,
            },
            }));
        return (
            <div>
                {/*{resultFound ? (*/}
                    <div>
                    <div className="linkPosition">
                    <Link to={`/channel/${this.state.channelId}`}>
                        <div className="backButton">
                            <button>Back</button>
                        </div>
                    </Link>
                </div>
                    <h1 id="title">Playlist Info</h1>
    
                    <TableContainer component={Paper}>
                    <Table sx={{ maxWidth: "80%",ml:"10%", marginBottom:"30px"}} aria-label="customized table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell>Playlist Title</StyledTableCell>
                            <StyledTableCell>Description</StyledTableCell>
                            <StyledTableCell>Video Number</StyledTableCell>
                            <StyledTableCell >Published At</StyledTableCell>
                        </TableRow>
                        </TableHead>
                            {this.state.show ? (<TableBody>
                                {this.state.playListInfo.map((playlist) => (
                                    <StyledTableRow key={playlist.snippet.title}>
                                    <StyledTableCell component="th" scope="row">
                                        {playlist.snippet.title}
                                    </StyledTableCell>
                                    <StyledTableCell>{playlist.snippet.localized.description}</StyledTableCell>
                                    <StyledTableCell>{playlist.contentDetails.itemCount}</StyledTableCell>
                                    <StyledTableCell>{playlist.snippet.publishedAt.substring(0,10)+" "+playlist.snippet.publishedAt.substring(11,19)}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                                <StyledTableRow>
                                    <StyledTableCell component="th" scope="row"/>
                                    {this.state.playListInfo.length>5 ? (<StyledTableCell id="showMore" align="center" onClick={()=>this.showLess()}>Show less...</StyledTableCell>):null}
                                    
                                    <StyledTableCell/>
                                    <StyledTableCell/>
                                    </StyledTableRow>
                            </TableBody>)
                            :(<TableBody>
                                {this.state.playListInfo.slice(0,6).map((playlist) => (
                                    <StyledTableRow key={playlist.snippet.title}>
                                    <StyledTableCell component="th" scope="row">
                                        {playlist.snippet.title}
                                    </StyledTableCell>
                                    <StyledTableCell>{playlist.snippet.localized.description}</StyledTableCell>
                                    <StyledTableCell>{playlist.contentDetails.itemCount}</StyledTableCell>
                                    <StyledTableCell>{playlist.snippet.publishedAt.substring(0,10)+" "+playlist.snippet.publishedAt.substring(11,19)}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                                <StyledTableRow>
                                    <StyledTableCell component="th" scope="row"/>
                                    <StyledTableCell id="showMore" align="center" onClick={()=>this.showMore()}>Show more...</StyledTableCell>
                                    <StyledTableCell/>
                                    <StyledTableCell/>
                                    </StyledTableRow>
                            </TableBody>)
                            }
                        
                    </Table>
                    </TableContainer>
                    </div>
                {/*// )*/}
                {/*// :null}*/}
            </div>)
    }
    
}

export default PlaylistInfo;
