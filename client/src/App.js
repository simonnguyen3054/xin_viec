import React, { Component } from 'react';
import "./App.css";
import logo from './logo.svg';
import './App.css';
import Feed from './components/Feed';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Feed />
        <footer className="footer">
          <div className="footer-copyright">
            ViecConnect &#169; 2019
          </div>
        </footer>
      </div>
    );
  }
}

export default App;