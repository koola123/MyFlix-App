import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './movie-view.scss';


export class MovieView extends React.Component {

  addFavorite(e, movie) {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios.post(`https://my-flix-48028.herokuapp.com/users/${username}/${this.props.movie._id}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(function (response) {
        alert('Added to Favorites List')
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    const { movie, onBackClick } = this.props;

    return (

      <div className="movie-view">
        <div className="movie-poster">
          <img src={movie.ImagePath} style={{ width: '69rem' }} />
        </div>
        <div className="movie-title">
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-director">
          <span className="label">Director: </span>
          <span className="value">{movie.Director.Name}</span>
          <div className="movie-description">
            <span className="label">Description: </span>
            <span className="value">{movie.Description}</span>
          </div>
        </div>
        <div className="movie-genre">
          <span className="label">Genre: </span>
          <span className="value">{movie.Genre.Name}</span>
        </div>
        <Link to={`/directors/${movie.Director.Name}`}>
          <Button id="btn-warning" variant="warning">Director</Button>
        </Link>
        <Link to={`/genres/${movie.Genre.Name}`}>
          <Button id="btn-warning" variant="warning">Genre</Button>
        </Link>
        <Button id="btn-warning" variant="warning" value={movie._id} onClick={(e) => this.addFavorite(e, movie)}>
          Add to Favorites
        </Button>
        <Button id="btn-warning" onClick={() => onBackClick(null)} variant="success">Back to Movies</Button>
      </div >
    );
  }
}


MovieView.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired
    })
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};