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

    axios.post(`https://my-blockbusters.herokuapp.com/users/${username}/${this.props.movie._id}`, {}, {
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
          <span className="movie-title">{movie.Title}!</span>
        <div className="movie-poster">
          <img src={movie.ImagePath} style={{ width: '15rem' }} />
          </div>
        <div className="movie-director">
          <span>Director: </span>
          <span>"{movie.Director.Name}"</span>
          <div className="movie-genre">
          <span>Film category / Genre: </span>
          <span>{movie.Genre.Name}</span>
        </div>
          <div className="movie-description">
            <span>{movie.Description}</span>
          </div>
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