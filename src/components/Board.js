import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Postit from './Postit';

import './Board.css';

class Board extends Component {
  static propTypes = {
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  };

  static defaultProps = {
    width: '100%',
    height: '100%',
  };

  state = {
    postits: [],
  };

  onAdd = () => {
    const { postits } = this.state;

    // Create an ID by using the length of postits array
    this.setState({
      postits: [...postits, postits.length],
    });
  };

  render() {
    const { width, height } = this.props;

    return (
      <div
        className="Board"
        style={{ width, height, backgroundColor: 'lightgray' }}
      >
        <button onClick={this.onAdd}>Create</button>
        {this.props.me}
        {this.state.postits.map(id => <Postit key={id} id={id} />)}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  me: state.notes.me,
});

export default connect(mapStateToProps, null)(Board);
