// src/components/visibility-filter-input/visibility-filter-input
import React from "react";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import { setFilter } from "../../actions/actions";

function VisibilityFilterInput(props) {
  return (
    <Form>
    <Form.Control
      className="border-0 py-5 mb-5 shadow-none"
      style={{marginLeft: "15px"}}
      type="text"
      placeholder="Search for a movie..."
      onChange={(e) => props.setFilter(e.target.value)}
      value={props.visibilityFilter}
      size="lg"
    />
    </Form>
  );
}

export default connect(null, { setFilter })(VisibilityFilterInput);
