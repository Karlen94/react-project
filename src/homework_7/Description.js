import React, { Component } from 'react';

class Description extends Component {
    render() {
        const { value } = this.props;
        return (
            <p>Assembly countri: {value}</p>
        )
    }
}

export { Description };