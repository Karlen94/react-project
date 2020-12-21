import React, { Component } from 'react';

class Price extends Component {
    render() {
        return (
            <p>This product costs: {this.props.price}</p>
        );
    }
}

export  {Price};