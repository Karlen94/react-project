import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import Counter from './components/demo/counter/Counter';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
// import reportWebVitals from './reportWebVitals';

function reducer(state = { count: 0 }, action) {
  switch (action.type) {
    case 'INCREMENT': {
      return {
        ...state,
        count: state.count + 1
      };
    }
    case 'DECREMENT': {
      return {
        ...state,
        count: state.count - 1
      };
    }
    default: return state;
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
