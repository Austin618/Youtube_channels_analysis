import React, { useState } from "react";

import "./videoListInfo.css";

import axios from "axios";
import Navbar from "../navbar/navbar";
import {getChannelInfo} from "../../actions/searchChannel";
import {Link} from "react-router-dom";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import {styled} from "@mui/material/styles";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";



/* Component for the Home page */
class VideoListInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            channelId: window.location.pathname.slice(8,),
            videoListInfo: null,

            show: false,
            sortBy: '',
        };
    }

    componentDidMount() {
        this.loadData()
    }

    loadData() {
        getChannelInfo("videos", this.state.channelId).then(json => {
            this.setState({videoListInfo: json})
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


    render() {
        if (!this.state.videoListInfo) {
            return (
                <div>
                    <Navbar />
                    <h1>Loading...</h1>
                </div>
            )
        }
        // need to be check in API
        if (this.state.videoListInfo.length === 0) {
            return (
                <div>
                    <Navbar />
                    <h1>Data Error!</h1>
                </div>
            )
        }

        const StyledTableCell = styled(TableCell)(({ theme }) => ({
            [`&.${tableCellClasses.head}`]: {
                backgroundColor: theme.palette.common.black,
                color: theme.palette.common.white,
            },
            [`&.${tableCellClasses.body}`]: {
                fontSize: 14,
            },
        }));

        const StyledTableRow = styled(TableRow)(({ theme }) => ({
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
            // hide last border
            '&:last-child td, &:last-child th': {
                border: 0,
            },
        }));

        return (
            <div>
                {console.log(this.state.channelId)}
                {console.log(this.state.videoListInfo[0])}
                <Navbar />
                {/*<Box sx={{ width: "30%" , ml:"15%", marginBottom:"20px", marginTop:"30px"}}>*/}
                {/*    <FormControl fullWidth>*/}
                {/*        <InputLabel id="demo-simple-select-label">Sort By</InputLabel>*/}
                {/*        <Select*/}
                {/*            labelId="demo-simple-select-label"*/}
                {/*            id="demo-simple-select"*/}
                {/*            label="Sort By"*/}
                {/*            value={this.state.sortBy}*/}
                {/*            onChange={this.state.handleChange}*/}
                {/*        >*/}
                {/*            <MenuItem value={1}>View Count: high to low</MenuItem>*/}
                {/*            <MenuItem value={2}>View Count: low to high</MenuItem>*/}
                {/*            <MenuItem value={3}>Published Time: latest to earliest</MenuItem>*/}
                {/*            <MenuItem value={4}>Published Time: earliest to latest</MenuItem>*/}
                {/*        </Select>*/}
                {/*    </FormControl>*/}
                {/*</Box>*/}
                <div className="linkPosition">
                    <Link to={`/channel/${this.state.channelId}`}>
                        <div className="backButton">
                            <button>Back</button>
                        </div>
                    </Link>
                </div>

                <TableContainer component={Paper}>
                    <Table sx={{ maxWidth: "80%",ml:"10%", marginBottom:"30px"}} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Video List Title</StyledTableCell>
                                <StyledTableCell>Description</StyledTableCell>
                                <StyledTableCell>Video Number</StyledTableCell>
                                <StyledTableCell>???</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        {this.state.show ? (<TableBody>
                                {this.state.videoListInfo.map((videoList) => (
                                    <StyledTableRow key={videoList.snippet.title}>
                                        <StyledTableCell component="th" scope="row">
                                            {videoList.snippet.title}
                                        </StyledTableCell>
                                        <StyledTableCell>{videoList.snippet.description}</StyledTableCell>
                                        <StyledTableCell>{videoList.snippet.publishedAt.substring(0,10)+" "+videoList.snippet.publishedAt.substring(11,19)}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                                <StyledTableRow>
                                    <StyledTableCell component="th" scope="row"/>
                                    <StyledTableCell id="showMore" align="center" onClick={()=>this.showLess()}>Show less...</StyledTableCell>
                                    <StyledTableCell/>
                                    <StyledTableCell/>
                                </StyledTableRow>
                            </TableBody>)
                            :(<TableBody>
                                {this.state.videoListInfo.slice(0,6).map((videoList) => (
                                    <StyledTableRow key={videoList.snippet.title}>
                                        <StyledTableCell component="th" scope="row">
                                            {videoList.snippet.title}
                                        </StyledTableCell>
                                        <StyledTableCell>{videoList.snippet.description}</StyledTableCell>
                                        <StyledTableCell>{videoList.snippet.publishedAt.substring(0,10)+" "+videoList.snippet.publishedAt.substring(11,19)}</StyledTableCell>
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
        );
    }
}

export default VideoListInfo;