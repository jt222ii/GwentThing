import React, { Component } from 'react';
import Cards from '../cards.json';

class DeckBuilder extends Component {
    constructor() {
        super();
        this.state = {
            search: '',
            pickedFaction: '-',
            currentDeck: [],
            bronzeAmount: 0,
            silverAmount: 0,
            goldAmount: 0
        };
    }

    //update state for filter "search"
    updateSearch(event) {
        this.setState({search: event.target.value})
    }

    //Update state for filter "pickedFaction"
    setFaction(event) {
        this.setState({pickedFaction: event.target.value})
    }

    //Adds a card to the deck
    addCard(card) {
        if(card.Type === 'Bronze') {
            if(this.cardCount(card) >= 3) {
                return;
            }
        } else {
            if((card.Type === 'Silver' && this.state.silverAmount >= 6) || (card.Type === 'Gold' && this.state.goldAmount >= 4) || this.cardCount(card) >= 1) {
                return;
            }
        }

        if(card.Type === 'Bronze') {
            this.state.bronzeAmount++;
        } else if(card.Type === 'Silver') {
            this.state.silverAmount++;
        } else {
            this.state.goldAmount++;
        }

        //Adds the new card, also sorts the array for readability purposes
        this.setState({currentDeck:[...this.state.currentDeck, card].sort((a,b) => a.Name.localeCompare(b.Name))}); 
        
    }

    removeCard(card) {
        let array = this.state.currentDeck;
        array.splice(array.indexOf(card), 1);; 
        this.setState({currentDeck: array });
        if(card.Type === 'Bronze') {
            this.state.bronzeAmount--;
        } else if(card.Type === 'Silver') {
            this.state.silverAmount--;
        } else {
            this.state.goldAmount--;
        }
    }

    //returns the amount of the specific card that is currently in the deck
    cardCount(card) {
        return this.state.currentDeck.reduce((n, val) => {return n + (val === card);}, 0);
    }

    //This function is not yet done. Only testing atm
    saveDeckToServer(){
        let xmlhttp = new XMLHttpRequest();
        let targetUrl = "/api/savedeck/pelle/test1"; //Temporary url (pelle and test) until log in system is implemented
        xmlhttp.open("POST", targetUrl);
        xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        xmlhttp.send(JSON.stringify(this.state.currentDeck));
    }

    render() {
        return(
            <div>
                <button onClick={() => {this.saveDeckToServer()}}/>
                <div id="filters">
                    <div>
                        <input id="searchBox" type="text" name="search" value={this.state.search} onChange={this.updateSearch.bind(this)}/>
                    </div>
                    <div>
                        <select value={this.state.pickedFaction} onChange={this.setFaction.bind(this)}>
                            <option value="-">-</option>
                            <option value="Scoia'tael">Scoiatael</option>
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
                                .filter((card) => card.Faction.toLowerCase().match('^'+this.state.pickedFaction.toLowerCase()+'|neutral.*'))
                                .filter((card) => card.Type.toLowerCase() !== 'leader')
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
                                                <div>
                                                    <div onClick={
                                                        ()=> {
                                                            this.addCard(card)
                                                        }
                                                    }>+({this.cardCount(card)}/{maxAmount})</div>
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })
                        }
                    </ul>
                </div>
                <div id="CardPicker">
                        <ul id="cardPickerList">
                        {
                            this.state.currentDeck.filter((card) => card.Name.toLowerCase().match('^'+this.state.search.toLowerCase()+'.*'))
                                .map((card, i) => {     
                                    return(
                                        <li key={i} id="CardPickerItem">
                                            <div>
                                                <div>{card.Name}</div>
                                                <div>P: {card.Power}</div>
                                                <div>Type: {card.Type}</div>
                                                <div>
                                                    <div onClick={
                                                        ()=> {
                                                            this.removeCard(card)
                                                        }
                                                    }>-</div>
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default DeckBuilder