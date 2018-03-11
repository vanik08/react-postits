import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import Paper from 'material-ui/Paper';

import './Postit.css';

const Postit = ({ id, x, y }) => {
  return (
    <Paper
      className="Postit"
      style={{
        position: 'absolute',
        top: x,
        left: y,
      }}
    >
      {id}
    </Paper>
  );
};

Postit.propTypes = {
  id: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

export default Postit;
