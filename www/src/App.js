import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


import Video from './Video';
export default function App() {



  return (
    <Router>
      <Switch>
        <Route path="/:videoId" component={Video} />
      </Switch>
    </Router>
  );
}


