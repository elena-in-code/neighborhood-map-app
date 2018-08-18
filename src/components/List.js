import React, { Component } from 'react';
//style
import '../App.css';

class List extends Component {
    render(){
        return(
            <li tabIndex="0" 
                className="listItem" 
                id={this.props.location.name} 
                key={this.props.location.key} 
                onClick={() => this.props.onLocationClick(this.props.location)}>

                <span role="img" aria-label="List Item Icon Museum" alt="icon museum">🏛️</span> {this.props.location.title}

            </li>
        )
    }
}

export default List;