import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { DragSource } from 'react-dnd';
import Paper from 'material-ui/Paper';
import { POSTIT } from '../constants/itemTypes';

import './Postit.css';

const Postit = ({ id, x, y, ...props }) => {
  return props.connectDragSource(
    <div
      onClick={props.onClick}
      className={classNames({
        'postit-hook': true,
        dragging: props.isDragging,
        open: props.open,
      })}
      style={{
        position: 'absolute',
        top: y,
        left: x,
        transform: props.open
          ? 'rotateY(360deg) scale(1.35)'
          : 'rotateY(0deg) scale(1)',
        zIndex: props.fadeout ? 1 : props.zIndex,
        opacity: props.isDragging ? 0 : 1,
        transition:
          (props.open || props.close) &&
          !props.isDragging &&
          'transform 400ms linear, top 500ms ease-in 150ms, left 500ms ease-in 150ms',
      }}
    >
      <Paper className="Postit">
        {props.open && (
          <div className="backside">
            Back of Note: {id} <p>Click to Close</p>
          </div>
        )}
        {!props.open && (
          <div>
            Note: {id} <p>Click me to Open</p>
          </div>
        )}
      </Paper>
    </div>
  );
};

Postit.propTypes = {
  id: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  open: PropTypes.bool,
  close: PropTypes.bool,
  isDragging: PropTypes.bool.isRequired,
  fadeout: PropTypes.bool,
  connectDragSource: PropTypes.func.isRequired,
  changePosition: PropTypes.func.isRequired,
};

const source = {
  beginDrag(props) {
    return {
      text: props.text,
    };
  },
  endDrag(props, monitor) {
    const { x, y } = monitor.getClientOffset();

    if (!props.open) {
      props.changePosition({
        id: props.id,
        x,
        y,
      });
    }
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

export default DragSource(POSTIT, source, collect)(Postit);
