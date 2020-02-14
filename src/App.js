import React, { Component } from 'react';
import './App.css';
import Tweet from './components/Tweet/Tweet'

class App extends Component {
  render() {
    return (
      <div className="App">
        <nav />
        <article>
          <Tweet />
        </article>
        <aside />
      </div>
    );
  }
}

export default App;
