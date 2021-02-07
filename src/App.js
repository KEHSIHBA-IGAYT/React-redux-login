import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { history } from './_redux/_helpers/';
import { PrivateRoute } from './components/PrivateRoute';
import { alertActions } from './_redux/_actions';

import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Profile/Profile';


const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location, action) => {
      dispatch(alertActions.clear())
    })
  });

  return (
    <div>
      <Router history={history}>
        <Switch>
          <PrivateRoute exact path="/users" component={Dashboard} />
          <PrivateRoute exact path="/users/:id" component={Profile} />
          <Route path="/login" component={Login} />
          <Redirect from="*" to="/login" />
        </Switch>
      </Router>
    </div>
  );
}


export default App;