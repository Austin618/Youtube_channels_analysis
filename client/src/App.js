/* New cleaned up version of App.js */
import React from 'react';

// Importing react-router-dom to use the React Router
import {Route, Routes, BrowserRouter, Link} from 'react-router-dom';
import axios from 'axios';

import Home from './component/home/home';
import TitleKeyword from "./component/titleKeyword/titleKeyword";
import Channel from "./component/channel/channel";
import PlaylistInfo from "./component/playlistInfo/playlistInfo";
import VideoListInfo from "./component/videoListInfo/videoListInfo";
import DescriptionKeyword from "./component/descriptionKeyword/descriptionKeyword";

class App extends React.Component {

  // a 'global' state that you can pass through to any child componenets of App.
  //   In the Routes below they are passed to both the Home and Queue states.
  state = {};

  constructor(props) {
    super(props);
  };

  sortWords(str,type,videoList,title) {
    const meaninglessWords = [
      'again', 'too', 'then', 'also', 'and', 'but', 'in', 'on', 'at', 'for',
      'a', 'an', 'the', 'if', 'because', 'so', 'before', 'after', 'is',
      'are', 'was', 'were', 'either', 'neither', 'nor', 'thus', 'hence',
      'therefore', 'not', 'that', 'whether', 'what', 'where', 'when', 'why',
      'how', 'who', 'than', 'such', 'though', 'from', 'above', 'below', 'no',
      'yes', 'of', 'I', 'am', 'you', 'he', 'his', 'him', 'she', 'her', 'hers',
      'we', 'our', 'ours', 'they', 'their', 'theirs', 'you', 'your', 'to',
      'with', 'by', 'do','i','or','it','as'
    ];

    let obj = {};
    if(type==='video'){
      str.replace(/[^a-zA-Z0-9 ]/g, '').trim().toLowerCase().split(/\s+/).forEach((element)=>{
        obj[element] = obj[element] ? obj[element] : 1;
      });
    }else{
      str.replace(/[^a-zA-Z0-9 ]/g, '').trim().toLowerCase().split(/\s+/).forEach((element)=>{
        obj[element] = obj[element] ? ++obj[element] : 1;
      });
    }
    

    for (let i = 0; i < meaninglessWords.length; i++) {
      delete obj[meaninglessWords[i]];
    }

    for(let element in obj){
      if(element.length<3){
        delete obj[element]
      }
    }

    let result = [];
    let objCommentCount = {};
    let objFavoriteCount = {};
    let objLikeCount = {};
    let objViewCount = {};
    for (let element in obj) {
      if(type==="video"){
        for(let i=0;i<videoList.length;i++){
          if(title){
            if(videoList[i].snippet.title.includes(element)){
              obj[element]=obj[element]+parseInt(videoList[i].statistics.commentCount)+parseInt(videoList[i].statistics.favoriteCount)+parseInt(videoList[i].statistics.likeCount)+parseInt(videoList[i].statistics.viewCount)
              objCommentCount[element] = objCommentCount[element] ? objCommentCount[element]+videoList[i].statistics.commentCount : videoList[i].statistics.commentCount;
              objFavoriteCount[element] = objFavoriteCount[element] ? objFavoriteCount[element]+videoList[i].statistics.favoriteCount : videoList[i].statistics.favoriteCount;
              objLikeCount[element] = objLikeCount[element] ? objLikeCount[element]+videoList[i].statistics.likeCount : videoList[i].statistics.likeCount;
              objViewCount[element] = objViewCount[element] ? objViewCount[element]+videoList[i].statistics.viewCount : videoList[i].statistics.viewCount;
            }
          }else{
            if(videoList[i].snippet.description.includes(element)){
              obj[element]=obj[element]+parseInt(videoList[i].statistics.commentCount)+parseInt(videoList[i].statistics.favoriteCount)+parseInt(videoList[i].statistics.likeCount)+parseInt(videoList[i].statistics.viewCount)
              objCommentCount[element] = objCommentCount[element] ? objCommentCount[element]+parseInt(videoList[i].statistics.commentCount) : parseInt(videoList[i].statistics.commentCount);
              objFavoriteCount[element] = objFavoriteCount[element] ? objFavoriteCount[element]+parseInt(videoList[i].statistics.favoriteCount) : parseInt(videoList[i].statistics.favoriteCount);
              objLikeCount[element] = objLikeCount[element] ? objLikeCount[element]+parseInt(videoList[i].statistics.likeCount) : parseInt(videoList[i].statistics.likeCount);
              objViewCount[element] = objViewCount[element] ? objViewCount[element]+parseInt(videoList[i].statistics.viewCount) : parseInt(videoList[i].statistics.viewCount);
            }
          }
          
        }
      }

      result.push([element, obj[element]]);
    }

    result.sort(function(a, b) {
      return b[1] - a[1];
    })


    return result;
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Routes> { /* Similar to a switch statement - shows the component depending on the URL path */ }
            { /* Each Route below shows a different component depending on the exact path in the URL  */ }
            <Route path='/' element={<Home/>}/>
            <Route path='/channel/:id' element={<Channel/>}/>
            <Route path='/playlists/:id' element={<PlaylistInfo theApp = {this} />}/>
            <Route path='/videos/:id' element={<VideoListInfo theApp = {this} />}/>
            <Route path='/playlists/:id' element={<PlaylistInfo/>}/>
            <Route path='/titleKeyword/:id' element={<TitleKeyword/>}/>
            <Route path='/descriptionKeyword/:id' element={<DescriptionKeyword/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    );  
  }
}

export default App;
