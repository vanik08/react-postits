import React, { Component } from 'react';
import { pick } from 'lodash';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { addToStack } from '../actions/notes';

import Postit from './Postit';

import './Board.css';

class Board extends Component {
  static propTypes = {
    stack: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
      })
    ).isRequired,
    addToStack: PropTypes.func,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  };

  static defaultProps = {
    width: '100%',
    height: '100%',
  };

  render() {
    const { width, height, stack, addToStack } = this.props;

    return (
      <div
        className="Board"
        style={{ width, height, backgroundColor: 'lightgray' }}
      >
        <FloatingActionButton label="Create" onClick={addToStack}>
          <ContentAdd />
        </FloatingActionButton>
        {stack.map(({ id }) => <Postit key={id} id={id} />)}
      </div>
    );
  }
}

const mapStateToProps = state => pick(state.notes, 'stack');

const mapDispatchToProps = dispatch =>
  bindActionCreators({ addToStack }, dispatch);

export default compose(connect(mapStateToProps, mapDispatchToProps))(Board);
