import React, { Component } from 'react';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import store from './store';
import Board from './components/Board';

import './App.css';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Provider store={store}>
          <div className="App">
            <Board height="100%" width="100%" />
          </div>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
