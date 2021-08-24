// src/components/visibility-filter-input/visibility-filter-input
import React from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { setFilter } from '../../actions/actions';

function VisibilityFilterInput(props) {
  return <Form.Control
    onChange={e => props.setFilter(e.target.value)}
    value={props.visibilityFilter}
    placeholder="Filter Movies..."
  />;
}

export default connect(
  null,
  { setFilter }
)(VisibilityFilterInput);