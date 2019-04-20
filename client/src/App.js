import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import "./App.css";
import Feed from "./components/Feed";
import Footer from "./components/Footer";
import PostItem from "./components/PostItem";

class App extends Component {
  render() {
    return (
      <Switch>
        <div className="App">
          <Route exact path="/" component={Feed} />
          <Route exact path="/posts/:post_id" component={PostItem} />
          <Footer />
        </div>
      </Switch>
    );
  }
}

export default App;
