import React from 'react';
import { connect } from 'react-redux';



function ShowCount(props) {
    return (
        <h2>
            Count: {props.value} <br/>
            Massage: {props.massage}
        </h2>
    )
}

const mapStateToProps = (state) => {
    return {
        value: state.count,
        massage: state.massage
    }
};

// const mapDispatchToProps = () => {

// };

export default connect(mapStateToProps, null)(ShowCount);