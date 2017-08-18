import React, { Component } from 'react';
import {Link} from 'react-router-dom';
class AppHeader extends Component {
    render() {
        return(
            <div className="App-header">
                <h2>Gwent Thing!</h2>
                <ul id="headerOptions">
                    <li><Link to="/">Cards</Link></li>
                    <li><Link to="/deckbuilder">deckbuilder</Link></li>
                </ul>
            </div>
        )
    }
}

export default AppHeader