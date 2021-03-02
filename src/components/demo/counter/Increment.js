import React from 'react';
import { connect } from 'react-redux';


function Increment(props) {


    return (
        <div>

            <button
                onClick={props.onIncrement}
            >
                Increment +
            </button>

        </div>
    )
}

// const mapStateToProps = (state) => {
//     return {
//         value: state.count
//     }
// };

const mapDispatchToProps = (dispatch) => {
    return {
        onIncrement: () => {
            dispatch({ type: 'INCREMENT' });
        }
    };
};

export default connect(null, mapDispatchToProps)(Increment);