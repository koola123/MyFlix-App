import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import "./director-view.scss";

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;

    return (
      <div className="director-view">
        <div className="director-name">
          <span className="value">{director.Name}</span>
        </div>
        <div className="director-bio">
          <span className="value">{director.Bio}</span>
        </div>
        <div className="director-birth">
          <span className="label">Born: </span>
          <span className="value">{director.Birth}</span>
        </div>
        <Button
          className="director-view-button"
          onClick={() => {
            onBackClick(null);
          }}
          variant="primary"
        >
          Back
        </Button>
      </div>
    );
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
