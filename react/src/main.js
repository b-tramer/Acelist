import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import Root from './Root'

$(function() {
  ReactDOM.render(
    <Root user={document.getElementById('app').dataset.user}/>,
    document.getElementById('app')
  );
});
