import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import Paper from 'material-ui/Paper';
import { POSTIT } from '../constants/itemTypes';

import './Postit.css';

const Postit = ({ id, x, y, ...props }) => {
  return props.connectDragSource(
    <div
      style={{
        position: 'absolute',
        top: y,
        left: x,
        opacity: props.isDragging ? 0.5 : 1,
      }}
    >
      <Paper className="Postit">{id}</Paper>
    </div>
  );
};

Postit.propTypes = {
  id: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  isDragging: PropTypes.bool.isRequired,
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

    props.changePosition({
      id: props.id,
      x,
      y,
    });
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

export default DragSource(POSTIT, source, collect)(Postit);
