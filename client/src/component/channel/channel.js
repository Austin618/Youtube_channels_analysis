import React, { useState } from "react";

import "./channel.css";

import axios from "axios";
import Navbar from "../navbar/navbar";
import {Link} from "react-router-dom";
import {getChannelInfo} from "../../actions/searchChannel";



/* Component for the Home page */
class Channel extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            errorMsg: null,
            channelId: window.location.pathname.slice(9,),
            channelInfo: null,
        };
    }

    componentDidMount() {
        this.loadData()
    }

    loadData() {
        getChannelInfo("channels", this.state.channelId).then(json => {
            this.setState({channelInfo: json})
        }).catch(error => {
            console.log(error)
            this.setState({
                errorMsg: "Channel cannot find!"
            })
        });
    }

    render() {
        if (this.state.errorMsg !== null) {
            return (
                <div>
                    <Navbar />
                    <h1>{this.state.errorMsg}</h1>
                </div>
            )
        }
        if (!this.state.channelInfo) {
            return (
                <div>
                    <Navbar />
                    <h1>Loading...</h1>
                </div>
            )
        }
        // need to be check in API
        if (this.state.channelInfo.length !== 1) {
            return (
                <div>
                    <Navbar />
                    <h1>Data format Error!</h1>
                </div>
            )
        }
        return (
            <div>
                {console.log(this.state.channelId)}
                {console.log(this.state.channelInfo[0])}
                <Navbar />
                <section className="section about-section" id="about">

                    <div className="linkPosition">
                        <Link to="/">
                            <div className="backButton">
                                <button>Back</button>
                            </div>
                        </Link>
                    </div>

                    <div className="row align-items-center">
                        <div className="leftBox">
                            <div className="about-text">
                                <h3 className="dark-color">Channel Description</h3>
                                <div className="about-list">
                                    <label>Channel Name</label>
                                    <p>{this.state.channelInfo[0].snippet.title}</p>

                                    <label>Channel ID</label>
                                    <p>{this.state.channelInfo[0].id}</p>

                                    <label>Etag</label>
                                    <p>{this.state.channelInfo[0].etag}</p>

                                    <label>Published at</label>
                                    <p>{this.state.channelInfo[0].snippet.publishedAt.slice(0, 10) + " " + this.state.channelInfo[0].snippet.publishedAt.slice(11, 19)}</p>

                                    <label>Country</label>
                                    <p>{this.state.channelInfo[0].snippet.country}</p>

                                    <label>Official site:</label>
                                    <a href={`https://www.youtube.com/${this.state.channelInfo[0].snippet.customUrl}`}> {`https://www.youtube.com/${this.state.channelInfo[0].snippet.customUrl}`}</a>
                                </div>
                                <p> {this.state.channelInfo[0].snippet.description.replace(/(\r\n|\n|\r)/gm,"")} </p>
                            </div>
                        </div>
                        <div className="rightBox">
                            <div className="about-avatar">
                                <img src={this.state.channelInfo[0].snippet.thumbnails.high.url} title="" alt="Youtube avatar"/>
                            </div>
                        </div>
                    </div>

                    <div className="counter">
                        <div className="row">
                            <div className="MiddleLeft">
                                <div className="count-data text-center">
                                    <h6 className="count h2">{this.state.channelInfo[0].statistics.viewCount}</h6>
                                    <p>View Count</p>
                                </div>
                            </div>
                            <div className="MiddleMiddle">
                                <div className="count-data text-center">
                                    <h6 className="count h2">{this.state.channelInfo[0].statistics.subscriberCount}</h6>
                                    <p>Subscriber Count</p>
                                </div>
                            </div>
                            <div className="MiddleRight">
                                <div className="count-data text-center">
                                    <h6 className="count h2">{this.state.channelInfo[0].statistics.videoCount}</h6>
                                    <p>Video Count</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="counter">
                        <div className="row">
                            <div className="bottomLeft">
                                <div className="count-data text-center">
                                    <Link to={`/playlists/${this.state.channelId}`}>
                                        <button>PlayList</button>
                                    </Link>
                                </div>
                            </div>
                            <div className="bottomRight">
                                <div className="count-data text-center">
                                    <Link to={`/videos/${this.state.channelId}`}>
                                        <button>Videos List</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*<div className="counter">*/}
                    {/*    <div className="row">*/}
                    {/*        <div className="bottomLeft">*/}
                    {/*            <div className="count-data text-center">*/}
                    {/*                <Link to={`/titleKeyword/${this.state.channelId}`}>*/}
                    {/*                    <button>Title Keyword Recommend</button>*/}
                    {/*                </Link>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*        <div className="bottomRight">*/}
                    {/*            <div className="count-data text-center">*/}
                    {/*                <Link to={`/descriptionKeyword/${this.state.channelId}`}>*/}
                    {/*                    <button>Description Keyword Recommend</button>*/}
                    {/*                </Link>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                </section>
            </div>
        );
    }
}

export default Channel;
