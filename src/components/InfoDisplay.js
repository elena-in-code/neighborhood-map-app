import React, { Component } from 'react';
//style
import '../App.css';

class InfoDisplay extends Component {
    render(){
        return(
            <section tabIndex="0" id="content">
                <p>{this.props.locationsContent}</p>
            </section>
        )
    }
}

export default InfoDisplay;