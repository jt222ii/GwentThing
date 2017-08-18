import React, { Component } from 'react';
import Cards from '../cards.json';

class DeckBuilder extends Component {
    constructor() {
        super();
        this.state = {
            search: '',
            pickedFaction: '-'
        };
    }

    updateSearch(event) {
        this.setState({search: event.target.value})
    }

    setFaction(event) {
        this.setState({pickedFaction: event.target.value})
    }

    render() {
        return(
            <div>
                <div id="filters">
                    <div>
                        <input id="searchBox" type="text" name="search" value={this.state.search} onChange={this.updateSearch.bind(this)}/>
                    </div>
                    <div>
                        <select value={this.state.pickedFaction} onChange={this.setFaction.bind(this)}>
                            <option value="-">-</option>
                            <option value="Scoia'tael">Scoia'tael</option>
                            <option value="Nilfgaard">Nilfgaard</option>
                            <option value="Northern Realms">Northern Realms</option>
                            <option value="Skellige">Skellige</option>
                            <option value="Monsters">Monsters</option>
                        </select>
                    </div>
                </div>
                <div id="CardPicker">
                    <ul id="cardPickerList">
                        {
                            Cards.filter((card) => card.Name.toLowerCase().match('^'+this.state.search.toLowerCase()+'.*'))
                                .filter((card) => card.Faction.toLowerCase().match('^'+this.state.pickedFaction.toLowerCase()+'.*'))
                                .map((card, i) => {
                                    let maxAmount = 3;
                                    if(card.Type !== 'Bronze')
                                    {
                                        maxAmount = 1;
                                    }
                                    return(
                                        <li key={i} id="CardPickerItem">
                                            <div>
                                                <div>{card.Name}</div>
                                                <div>P: {card.Power}</div>
                                                <div>Type: {card.Type}</div>
                                                <div>0/{maxAmount}  +</div>
                                            </div>
                                        </li>
                                    );
                                })
                        }
                    </ul>
                </div>
                <div id="CardPicker">
                        <p>THE DECK BUILT WILL BE DISPLAYED HERE</p>
                </div>
            </div>
        )
    }
}

export default DeckBuilder