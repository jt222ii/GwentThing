import React, { Component } from 'react';
import './App.css';

import AppHeader from './Components/AppHeader';
import { BrowserRouter, Route} from 'react-router-dom';

import CardList from './Components/CardList';
import DeckBuilder from './Components/DeckBuilder';

class App extends Component {
    render() {
      return (
        
      <BrowserRouter>
        <div>
           <AppHeader />
           <div className="content">
               <Route exact path="/" component={CardList}/>
               <Route path="/deckbuilder" component={DeckBuilder}/>
            </div>
        </ div>
      </BrowserRouter>
      );
    }
}

export default App;
