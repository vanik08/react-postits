import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Postit extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
  };

  render() {
    return <div className="Postit">postit {this.props.id}</div>;
  }
}

export default Postit;
