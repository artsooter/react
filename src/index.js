/* eslint-disable camelcase */
/* eslint-disable react/sort-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'shineout/dist/theme.default.css';
import { Table, Button, Form, Input } from 'shineout';
// eslint-disable-next-line import/extensions
import { connect, Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { store, toDo } from './myRedux';
// import { ClassTable } from './classTable';
import { Tool } from './tool';
import { StdSelect } from './stdSelect';
import { ClassTable, StudentTable } from './classTable';
import { MainDiv } from './gitView';
import { MainTable } from './mainTable';


function App(props) {
  return (
    <div>
      <MainTable />
      <ClassTable />
      <StudentTable />
    </div>

  );
}
ReactDOM.render(
  <Router>
    <div>
      <ul>
        <li><Link to="/sc">sc</Link></li>
        <li><Link to="/gitView">gitView</Link></li>
      </ul>
    </div>
    <Provider store={store}>
      <Route path="/sc" component={App} />
      <Route path="/gitView" component={MainDiv} />
    </Provider>
  </Router>,
  document.getElementById('root'),
);
