import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';

import './Postit.css';

class Postit extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  };

  render() {
    return (
      <Paper
        className="Postit"
        style={{
          position: 'absolute',
          top: 50,
          left: 0,
        }}
      >
        {this.props.id}
      </Paper>
    );
  }
}

export default Postit;
