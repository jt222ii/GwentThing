import React, { Component } from 'react';
import Cards from '../cards.json';

class CardList extends Component {
    render() {

        return(
        <table>
            <thead>
                <td />
                <td>Name</td>    
                <td>Power</td>
                <td>Abilities</td>
                <td>Faction</td>
                <td>Row</td>  
                <td>Type</td>
            </thead>
            <tbody>
                {Cards.map((card, i) => {
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
                })}
            </tbody>
        </table>
        )
    }
}

export default CardList