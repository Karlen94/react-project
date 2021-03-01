// import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
// import User from './User';
// import PageInformation from './Page_information';
// import SensMessage from './Get_message';
// import Product from './homework_7/Product';
import ToDo from './components/ToDo/ToDoList';
import 'bootstrap/dist/css/bootstrap.min.css';
import About from './components/pages/About/About';
import Contact from './components/pages/Contact/Contact';
import NotFound from './components/pages/NotFound/NotFound';
import NavMenu from './components/NavMenu/NavMenu';
import SingleTask from './components/pages/SingleTask/SingleTask';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Spinner from './components/Spinner/Spinner';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App({ loading, successMessage }) {


  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage, {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }

  }, [successMessage])



  return (
    <div className="App">


      <BrowserRouter>
        <NavMenu />
        <Switch>
          <Route
            path='/'
            component={ToDo}
            exact={true}
          />
          <Route
            path='/home'
            component={ToDo}
            exact={true}
          />
          <Route
            path='/about'
            component={About}
            exact={true}
          />
          <Route
            path='/contact'
            component={Contact}
            exact={true}
          />
          <Route
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
      </BrowserRouter>
      {loading && <Spinner />}
      <ToastContainer />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    successMessage: state.successMessage
  }
};

export default connect(mapStateToProps)(App);
