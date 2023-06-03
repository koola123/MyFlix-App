import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

import "./movie-card.scss";

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
        <Card style={{ height: "100%" }}> 
          <Card.Img variant="top" src={movie.ImagePath} />
          <Card.Body className="movie-card-body">
            <Card.Title>{movie.Title}</Card.Title>
            <Link to={`/movies/${movie._id}`}>
              <Button
                style={{ backgroundColor: "#3f51b5", padding: "12px"}}
                size="md"
                className="w-100"
              >
                Show Details
              </Button>
            </Link>
          </Card.Body>
        </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
