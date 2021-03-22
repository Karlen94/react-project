import './App.css';
import React, { useEffect } from 'react';
import ToDo from './components/ToDo/ToDoList';
import 'bootstrap/dist/css/bootstrap.min.css';
import About from './components/pages/About/About';
import Contact from './components/pages/Contact/Contact';
import NotFound from './components/pages/NotFound/NotFound';
import Login from './components/pages/Login/Login';
import Register from './components/pages/Register/Register';
import NavMenu from './components/NavMenu/NavMenu';
import SingleTask from './components/pages/SingleTask/SingleTask';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Spinner from './components/Spinner/Spinner';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { history } from './helpersFunctions/history';
import  AuthRoute  from './components/pages/AuthRoute/AuthRoute';

const toastProps = {
  position: "bottom-left",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};



function App({ loading, successMessage, errorMessage, isAuthenticated }) {


  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage, toastProps);
    }

    if (errorMessage) {
      toast.error(errorMessage, toastProps);
    }

  }, [successMessage, errorMessage])



  return (
    <div className="App">


      <Router history={history}>
        <NavMenu />
        <Switch>
          <AuthRoute
            path='/'
            component={ToDo}
            exact={true}
          />
          <AuthRoute
            path='/about'
            component={About}
            exact={true}
          />
          <AuthRoute
            path='/contact'
            component={Contact}
            exact={true}
          />
          <AuthRoute
            path='/login'
            component={Login}
            exact={true}
          />
          <AuthRoute
            path='/register'
            component={Register}
            exact={true}
          />
          <AuthRoute
            path='/task/:taskId'
            component={SingleTask}
            exact={true}
          />
          <Route
            path='/not-found'
            component={NotFound}
            exact={true}
          />

          <Redirect to='/not-found' />
        </Switch>
      </Router>
      {loading && <Spinner />}
      <ToastContainer />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    successMessage: state.successMessage,
    errorMessage: state.errorMessage,
    isAuthenticated: state.isAuthenticated
  }
};

export default connect(mapStateToProps)(App);
