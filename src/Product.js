import React, { Component } from 'react';
import { Price } from './Price';
import Name from './Name';
import { Description } from './Description';


class Product extends Component {

    render() {
        return (
            <div>
                <h3>This is an example of advertising</h3>
                <Name name={this.props.name} />
                <Price price={this.props.price} />
                <Description description={this.props.description} />
            </div>
        );
    }
}

export default Product;