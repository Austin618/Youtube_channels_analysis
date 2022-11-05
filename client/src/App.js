/* New cleaned up version of App.js */
import React from 'react';

// Importing react-router-dom to use the React Router
import {Route, Routes, BrowserRouter, Link} from 'react-router-dom';
import axios from 'axios';

import Home from './component/home/home';
import Recommend from "./component/recommend/recommend";
import Channel from "./component/channel/channel";
import PlaylistInfo from "./component/playlistInfo/playlistInfo";
import VideoListInfo from "./component/videoListInfo/videoListInfo";

class App extends React.Component {

  // a 'global' state that you can pass through to any child componenets of App.
  //   In the Routes below they are passed to both the Home and Queue states.
  state = {}

  render() {
    return (
      <div>
        <BrowserRouter>
          <Routes> { /* Similar to a switch statement - shows the component depending on the URL path */ }
            { /* Each Route below shows a different component depending on the exact path in the URL  */ }
            <Route path='/' element={<Home/>}/>
            <Route path='/channel/:id' element={<Channel/>}/>
            <Route path='/playlists/:id' element={<PlaylistInfo/>}/>
            <Route path='/videos/:id' element={<VideoListInfo/>}/>
            <Route path='/recommend' element={<Recommend/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    );  
  }
}

export default App;
