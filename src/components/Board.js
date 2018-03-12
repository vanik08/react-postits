import React, { Component } from 'react';
import pick from 'lodash/pick';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import {
  addToStack,
  changePosition,
  openPostit,
  closePostit,
} from '../actions/notes';

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
    closePostit: PropTypes.func,
    openPostitId: PropTypes.string,
    closePostitId: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  };

  static defaultProps = {
    width: '100%',
    height: '100%',
  };

  onSelect = (id, open) => {
    if (!open) {
      this.props.openPostit(id);
    } else {
      this.props.closePostit(id);
    }
  };

  render() {
    const {
      width,
      height,
      stack,
      addToStack,
      changePosition,
      openPostitId,
      closePostitId,
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
            onClick={() => this.onSelect(props.id, props.id === openPostitId)}
            changePosition={changePosition}
            open={props.id === openPostitId}
            close={props.id === closePostitId}
            fadeout={openPostitId && props.id !== openPostitId}
            {...props}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state =>
  pick(state.notes, 'stack', 'openPostitId', 'closePostitId');

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { addToStack, changePosition, openPostit, closePostit },
    dispatch
  );

export default compose(connect(mapStateToProps, mapDispatchToProps))(Board);
