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

            titleFrequency: [],
            descriptionFrequency: [],

            option: "",
        };
    }

    componentDidMount() {
        void this.loadData(this.props.theApp);
    }

    async loadData(theApp) {
        const json = await getChannelInfo("videos", this.state.channelId);
        this.setState({videoListInfo: json})
        this.sortByVideoTitle(theApp, json)
        this.sortByVideoDescription(theApp, json)
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

    sortByVideoTitle = (theApp, json) => {
        let str_lst = [];
        json.map((videoList) => {
            str_lst.push(videoList.snippet.title)
        });
        
        let all_str = str_lst.join(' ')

        let videoList=json
        videoList.sort(function(a, b) {
            return b.statistics.viewCount - a.statistics.viewCount
        })
        let result = theApp.sortWords(all_str,"video",videoList,true);
        this.setState({
            titleFrequency: result
        })
    }

    sortByVideoDescription = (theApp, json) => {
        let str_lst = [];
        json.map((videoList) => {
            str_lst.push(videoList.snippet.description)
        });
        let all_str = str_lst.join(' ')
        let videoList=json
        videoList.sort(function(a, b) {
            return b.statistics.viewCount - a.statistics.viewCount
        })
        console.log(videoList)
        let result = theApp.sortWords(all_str,"video",videoList,false);
        this.setState({
            descriptionFrequency: result
        })
    }

    printNum = (view, like, comment) => {
        if (view === undefined) {
            view = 0;
        }
        if (like === undefined) {
            like = 0;
        }
        if (comment === undefined) {
            comment = 0;
        }
        return "view: " + view + "\n" + "like: " + like + "\n" + "comment: " + comment
    }

    handleChange(e){
        this.setState({
            option: e.target.value
        })
    }

    sortTable = () => {
        if (this.state.option === "") {
            return;
        } else if (this.state.option === "Publish Time: New to Old") {
            this.state.videoListInfo.sort(function(a, b) {
                const aTime = parseInt((a.snippet.publishedAt.slice(0, 10) + a.snippet.publishedAt.slice(11, 19)).replace(/[-:]/g, ''));
                const bTime = parseInt((b.snippet.publishedAt.slice(0, 10) + b.snippet.publishedAt.slice(11, 19)).replace(/[-:]/g, ''));
                return bTime - aTime;
            })
        } else if (this.state.option === "View Count: High to Low") {
            this.state.videoListInfo.sort(function(a, b) {
                return b.statistics.viewCount - a.statistics.viewCount
            })
        } else if (this.state.option === "Like Count: High to Low") {
            this.state.videoListInfo.sort(function (a, b) {
                return b.statistics.likeCount - a.statistics.likeCount
            })
        } else if (this.state.option === "Comment Count: High to Low") {
            this.state.videoListInfo.sort(function (a, b) {
                return b.statistics.commentCount - a.statistics.commentCount
            })
        }
    }

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

        // const {theApp} = this.props;

        return (
            <div>
                {/*{theApp.sortWords()}*/}
                {/*{console.log(this.state.channelId)}*/}
                {/*{console.log(this.state.videoListInfo[0])}*/}
                <Navbar />
                <div className="linkPosition">
                    <Link to={`/channel/${this.state.channelId}`}>
                        <div className="backButton">
                            <button>Back</button>
                        </div>
                    </Link>
                </div>
                <h1 className="title">Videos Info</h1>

                <h3 className="leftMargin">Recommended Keywords For Video Titles:</h3>
                <h4 className="leftMargin">favorite count+like count+view count+comment count</h4>
                <TableContainer component={Paper}>
                    <Table sx={{ maxWidth: "80%",ml:"10%", marginBottom:"30px"}} aria-label="customized table">
                        <TableHead><TableRow><StyledTableCell>Words</StyledTableCell>
                            {this.state.titleFrequency.slice(0, 20).map((arr) => (
                                    <StyledTableCell>{arr[0]}</StyledTableCell>
                            ))}</TableRow>
                        </TableHead>
                        <TableBody><StyledTableRow><StyledTableCell>Total Score</StyledTableCell>
                            {this.state.titleFrequency.slice(0, 20).map((arr) => (
                                    <StyledTableCell>{arr[1]}</StyledTableCell>
                            ))}</StyledTableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                <h3 className="leftMargin">Recommended Keywords For Video Descriptions:</h3>
                <h4 className="leftMargin">favorite count+like count+view count+comment count</h4>
                <TableContainer component={Paper}>
                    <Table sx={{ maxWidth: "80%",ml:"10%", marginBottom:"30px"}} aria-label="customized table">
                        <TableHead><TableRow><StyledTableCell>Words</StyledTableCell>
                            {this.state.descriptionFrequency.slice(0, 20).map((arr) => (
                                <StyledTableCell>{arr[0]}</StyledTableCell>
                            ))}</TableRow>
                        </TableHead>
                        <TableBody><StyledTableRow><StyledTableCell>Total Score</StyledTableCell>
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
                        <option value="Publish Time: New to Old">Publish Time: latest to earliest</option>
                        <option value="View Count: High to Low">View Count: High to Low</option>
                        <option value="Like Count: High to Low">Like Count: High to Low</option>
                        <option value="Comment Count: High to Low">Comment Count: High to Low</option>
                    </select>
                </div>

                <TableContainer component={Paper}>
                    <Table sx={{ maxWidth: "80%",ml:"10%", marginBottom:"30px"}} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Video Title</StyledTableCell>
                                <StyledTableCell>Video Description</StyledTableCell>
                                <StyledTableCell>Published Time</StyledTableCell>
                                <StyledTableCell>View/Like/Comment Count</StyledTableCell>
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
                                        <StyledTableCell>{this.printNum(videoList.statistics.viewCount, videoList.statistics.likeCount, videoList.statistics.commentCount)}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                                <StyledTableRow>
                                    <StyledTableCell component="th" scope="row"/>
                                    {this.state.videoListInfo.length>5 ? (<StyledTableCell id="showMore" align="center" onClick={()=>this.showLess()}>Show less...</StyledTableCell>):null}
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
                                        <StyledTableCell>{this.printNum(videoList.statistics.viewCount, videoList.statistics.likeCount, videoList.statistics.commentCount)}</StyledTableCell>
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
