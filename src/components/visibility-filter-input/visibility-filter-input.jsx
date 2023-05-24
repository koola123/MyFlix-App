// src/components/visibility-filter-input/visibility-filter-input
import React from "react";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import { setFilter } from "../../actions/actions";

function VisibilityFilterInput(props) {
  return (
    <Form.Control
      className="visibility-filter"
      onChange={(e) => props.setFilter(e.target.value)}
      value={props.visibilityFilter}
      placeholder="Search for a movie..."
      style={{ width: "71.233rem", marginTop:"50px"}}
    />
  );
}

export default connect(null, { setFilter })(VisibilityFilterInput);
