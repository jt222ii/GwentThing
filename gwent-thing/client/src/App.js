import React, { Component } from 'react';
import './App.css';
import CardList from './Components/CardList'

class App extends Component {
    render() {
      return (
        <div className="App">
          <div className="App-header">
            <h2>Gwent Thing!</h2>
            {/* Buttons will be replaced by components, they are temporary */}
            <button>Cards</button>
            <button>My Decks</button>
            <button>Log in</button>
          </div>
          <div>
            <CardList />
          </div>
        </div>
      );
    }
}

export default App;
