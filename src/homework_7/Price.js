import React, { Component } from 'react';

class Price extends Component {
    constructor(props) {
        super(props);
        this.state = {
            change: props.value,
            text: '$ '

        }
    }


    changeTheCurrency = () => {
        if (this.state.text === '$ ') {
            this.setState({
                change: this.state.change * 500,
                text: 'dram'
            })
        } else {
            this.setState({
                change: this.state.change / 500,
                text: '$ '
            })
        }

    }

    render() {

        return (
            <p>This product costs: {this.state.change} {this.state.text}
                <button onClick={this.changeTheCurrency}>
                    Change the currency
            </button>
            </p>
        );
    }
}

export { Price };