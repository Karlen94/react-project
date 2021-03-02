import React from 'react';
import { connect } from 'react-redux';


function Decrement(props) {


    return (
        <div>

            <button
                onClick={props.onDecrement}
            >
                Decrement -
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
        onDecrement: () => {
            dispatch({ type: 'DECREMENT' });
        }
    };
};

export default connect(null, mapDispatchToProps)(Decrement);