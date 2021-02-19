import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import Counter from './components/demo/Counter';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
// import reportWebVitals from './reportWebVitals';

function reducer(state = { count: 0 }, action) {
  if (action.type === 'CHANGE_COUNT') {
    return {
      ...state,
      count: state.count + 1
    }
  }
  if (action.type === 'SEND_MASSAGE') {
    return {
      ...state,
      massage: action.massage
    }
  }

  return state;

}

const store = createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Counter />
    </Provider>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
