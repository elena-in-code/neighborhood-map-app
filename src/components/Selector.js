import React, { Component } from 'react';
//style
import '../App.css';

class Selector extends Component {
    render(){
        return(
            <option 
            value={ this.props.location.name } 
            key={this.props.location.key}>
                {this.props.location.title}
            </option>
        )
    }
}

export default Selector;