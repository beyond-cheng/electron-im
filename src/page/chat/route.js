import React from "react";
import Game from "./js/chat";
import Main from './main/index'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.


class BasicExample extends React.Component {
  constructor(props) {
    super(props);
  }

  logout() {
    
    window.NativeAPI.logout();
    
  }

  render() {
    return (
        <Router>
          <div>
            <ul>
              <li>
                <Link to="/">Chat</Link>
              </li>
              <li>
                <Link to="/main">Main</Link>
              </li>
              <li>
                <Link to="/quit">quit</Link>
              </li>
            </ul>
            <div>
              <a onClick={this.logout.bind(this)}>logout</a>
            </div>

            <hr />

            {/*
              A <Switch> looks through all its children <Route>
              elements and renders the first one whose path
              matches the current URL. Use a <Switch> any time
              you have multiple routes, but you want only one
              of them to render at a time
            */}
            <Routes>
              <Route exact path="/" element={<Game />} />
              <Route path="/main" element={<Main />} />
              <Route path="/quit" element={<Quit />}></Route>
            </Routes>
          </div>
        </Router>
        );
   }
}


class Quit extends React.Component {
  
  render() {
    return (
      <div>
        <h2>Quit</h2>
      </div>
    );
  }
}

export default BasicExample;