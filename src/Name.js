import React, { Component } from 'react';

class Name extends Component {
    render() {
        return (
            <p>Product name: {this.props.name}</p>
        )
    }
}

export default Name;