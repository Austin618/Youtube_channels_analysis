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

            titleFrequency: [],
            descriptionFrequency: [],

            option: "",
        };
    }

    componentDidMount() {
        void this.loadData(this.props.theApp)
    }

    async loadData(theApp) {
        const json = await getChannelInfo("playlists", this.state.channelId);
        this.setState({playListInfo: json});
        this.sortByPlaylistTitle(theApp, json);
        this.sortByPlaylistDescription(theApp, json);
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

    sortByPlaylistTitle = (theApp, json) => {
        let str_lst = [];
        json.map((playList) => {
            str_lst.push(playList.snippet.title)
        });
        let all_str = str_lst.join(' ')
        let str_frequency = theApp.sortWords(all_str);
        this.setState({
            titleFrequency: str_frequency
        })
    }

    sortByPlaylistDescription = (theApp, json) => {
        let str_lst = [];
        json.map((playList) => {
            str_lst.push(playList.snippet.localized.description)
        });
        let all_str = str_lst.join(' ')
        let str_frequency = theApp.sortWords(all_str);
        this.setState({
            descriptionFrequency: str_frequency
        })
    }

    handleChange(e){
        this.setState({
            option: e.target.value
        })
    }

    sortTable = () => {
        if (this.state.option === "") {
            return;
        } else if (this.state.option === "Video Count: High to Low") {
            this.state.playListInfo.sort(function(a, b) {
                return b.contentDetails.itemCount - a.contentDetails.itemCount
            })
        } else if (this.state.option === "Publish Time: New to Old") {
            this.state.playListInfo.sort(function(a, b) {
                const aTime = parseInt((a.snippet.publishedAt.slice(0, 10) + a.snippet.publishedAt.slice(11, 19)).replace(/[-:]/g, ''));
                const bTime = parseInt((b.snippet.publishedAt.slice(0, 10) + b.snippet.publishedAt.slice(11, 19)).replace(/[-:]/g, ''));
                return bTime - aTime;
            })
        }
    }

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

        // const {theApp} = this.props;

        return (
            <div>
                {/*{theApp.sortWords()}*/}
                <Navbar />
                {/*{resultFound ? (*/}
                <div>
                    <div className="linkPosition">
                    <Link to={`/channel/${this.state.channelId}`}>
                        <div className="backButton">
                            <button>Back</button>
                        </div>
                    </Link>
                </div>
                <h1 className="title">Playlist Info</h1>

                <h3 className="leftMargin">Playlist Title High Frequency Words:</h3>
                <TableContainer component={Paper}>
                    <Table sx={{ maxWidth: "80%",ml:"10%", marginBottom:"30px"}} aria-label="customized table">
                        <TableHead><TableRow><StyledTableCell>Words</StyledTableCell>
                            {this.state.titleFrequency.slice(0, 20).map((arr) => (
                                <StyledTableCell>{arr[0]}</StyledTableCell>
                            ))}</TableRow>
                        </TableHead>
                        <TableBody><StyledTableRow><StyledTableCell>Appear Times</StyledTableCell>
                            {this.state.titleFrequency.slice(0, 20).map((arr) => (
                                <StyledTableCell>{arr[1]}</StyledTableCell>
                            ))}</StyledTableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                <h3 className="leftMargin">Playlist Description High Frequency Words:</h3>
                <TableContainer component={Paper}>
                    <Table sx={{ maxWidth: "80%",ml:"10%", marginBottom:"30px"}} aria-label="customized table">
                        <TableHead><TableRow><StyledTableCell>Words</StyledTableCell>
                            {this.state.descriptionFrequency.slice(0, 20).map((arr) => (
                                <StyledTableCell>{arr[0]}</StyledTableCell>
                            ))}</TableRow>
                        </TableHead>
                        <TableBody><StyledTableRow><StyledTableCell>Appear Times</StyledTableCell>
                            {this.state.descriptionFrequency.slice(0, 20).map((arr) => (
                                <StyledTableCell>{arr[1]}</StyledTableCell>
                            ))}</StyledTableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                <div className="leftMargin">
                    <h3>Choose order here:</h3>
                    <select value={this.state.option} onChange={this.handleChange.bind(this)}>
                        {this.sortTable()}
                        <option value="" disabled hidden>Choose sort by:</option>
                        <option value="Video Count: High to Low">Video Count: High to Low</option>
                        <option value="Publish Time: New to Old">Publish Time: New to Old</option>
                    </select>
                </div>

                <TableContainer component={Paper}>
                    <Table sx={{ maxWidth: "80%",ml:"10%", marginBottom:"30px"}} aria-label="customized table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell>Playlist Title</StyledTableCell>
                            <StyledTableCell>Description</StyledTableCell>
                            <StyledTableCell>Video Number</StyledTableCell>
                            <StyledTableCell >Published Time</StyledTableCell>
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
