import React, { Component } from 'react';

class Description extends Component {
    render() {
        return (
            <p>Assembly countri: {this.props.description}</p>
        )
    }
}

export { Description };