import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { MovieCard } from '../movieCard/movieCard';
import axios from 'axios';


const mapStateToProps = state => {
  const { user, movies } = state;
  return { user, movies };
}

const ProfileView = ({ user, token, movies, onBackClick }) => {
  const [userFavorites, setUserFavorites] = useState(() => {
    const favorites = []

    movies.map(m => {
      user.data.movies.indexOf(m._id) !== -1 ? favorites.push(m) : false;
    })

    return favorites;
  });

  return (
    <div className="wrapper d-flex flex-grow-1">
      <Container className="userMovies">
        <Button className="btn-light border-dark mr-2 " onClick={onBackClick}>Back</Button>
        <Row>
          {userFavorites.length === 0
            ? <Col className="text-dark">No have no favorites... </Col>
            : userFavorites.map((m, i) => (
              <Col key={`col-${i}`}>
                <MovieCard key={`movie-${i}`} movie={m} />
              </Col>
            ))}
        </Row>
      </Container>
    </div>
  )
}
ProfileView.propTypes = {
  user: PropTypes.object,
  token: PropTypes.string,
  onBackClick: PropTypes.func,
  onLogOut: PropTypes.func,
}

export default connect(mapStateToProps)(ProfileView);