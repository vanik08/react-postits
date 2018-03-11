import React, { Component } from 'react';
import { connect } from 'react-redux';

class Board extends Component {
  render() {
    return <div className="Board">{this.props.me}</div>;
  }
}

const mapStateToProps = state => ({
  me: state.notes.me,
});

export default connect(mapStateToProps, null)(Board);
