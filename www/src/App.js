import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";
import ReactPlayer from 'react-player'
import axios from 'axios'

export default function App() {

  return (
    <Router>
      <Switch>
        <Route path="/:videoId">
          <Video />
        </Route>
      </Switch>
    </Router>
  );
}

function Video() {
  let { videoId } = useParams();
  let videoTime = 0;

  function onChanges(time){
    videoTime = Math.round(time)
    console.log(videoTime)
  }
  return (
  <>
    <center>
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${videoId}`}
        playing
        onProgress={function ({ playedSeconds }) {
          onChanges(playedSeconds)
        }} /> 
    </center> 
  </>
  )
}


