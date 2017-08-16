import React, { Component } from 'react';
import Cards from '../cards.json';

class CardList extends Component {
    constructor() {
        super();
        this.state = {
            search: ''
        };
    }

    updateSearch(event) {
        this.setState({search: event.target.value})
    }

    render() {
        return(
            <div>
                <input id="searchBox" type="text" name="search" value={this.state.search} onChange={this.updateSearch.bind(this)}/>
                <table id="cardTable">
                    <thead>
                        <td></td> 
                        <td>Name</td>    
                        <td>Power</td>
                        <td>Abilities</td>
                        <td>Faction</td>
                        <td>Row</td>  
                        <td>Type</td>
                    </thead>
                    <tbody>
                        {
                            Cards.filter((card) => card.Name.toLowerCase().match('^'+this.state.search.toLowerCase()+'.*'))
                                .map((card, i) => {
                                    return(
                                    <tr key={i}>
                                        <td>
                                            <img src={card.imageurl} alt="" id="cardImage" />
                                        </td>
                                        <td>{card.Name}</td>    
                                        <td>{card.Power}</td>
                                        <td>{card.Abilities}</td>
                                        <td>{card.Faction}</td>
                                        <td>{card.Row}</td>  
                                        <td>{card.Type}</td>
                                    </tr>);
                                })
                            }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default CardList