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

                🏛️ {this.props.location.title}

            </li>
        )
    }
}

export default List;