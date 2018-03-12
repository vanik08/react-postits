import React, { Component } from 'react';
import { pick } from 'lodash';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { addToStack, changePosition, openPostit } from '../actions/notes';

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
    changePosition: PropTypes.func,
    openPostit: PropTypes.func,
    openPostitId: PropTypes.string,
    closePostit: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  };

  static defaultProps = {
    width: '100%',
    height: '100%',
  };

  onSelect = id => {
    this.props.openPostit(id);
  };

  render() {
    const {
      width,
      height,
      stack,
      addToStack,
      changePosition,
      openPostitId,
      closePostit,
    } = this.props;

    return (
      <div className="Board" style={{ width, height }}>
        <FloatingActionButton label="Create" onClick={addToStack}>
          <ContentAdd />
        </FloatingActionButton>
        {openPostitId && <div className="backdrop" />}
        {stack.map(props => (
          <Postit
            key={props.id}
            onClick={() => this.onSelect(props.id)}
            changePosition={changePosition}
            open={props.id === openPostitId}
            close={props.id === closePostit}
            fadeout={openPostitId && props.id !== openPostitId}
            {...props}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state =>
  pick(state.notes, 'stack', 'openPostitId', 'closePostit');

const mapDispatchToProps = dispatch =>
  bindActionCreators({ addToStack, changePosition, openPostit }, dispatch);

export default compose(connect(mapStateToProps, mapDispatchToProps))(Board);
