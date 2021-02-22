import React from 'react';
import Increment from './Increment';
import Decrement from './Decrement';


function ChangeCount(props) {


    return (
        <div>
            <Increment />
            <Decrement />
        </div>
    )
}

// const mapStateToProps = (state) => {
//     return {
//         value: state.count
//     }
// };

// const mapDispatchToProps = (dispatch) => {
//     return {
//         onChange: () => {
//             dispatch({ type: 'CHANGE_COUNT' });
//         },
//         onSendValue: (val) => {
//             dispatch({ type: 'SEND_MASSAGE', massage: val });
//         }
//     };
// };

export default ChangeCount;