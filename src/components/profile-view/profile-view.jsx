import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Button, Card, CardDeck, Form, Row } from 'react-bootstrap';

import './profile-view.scss';

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthdate: null,
      FavoriteMovies: [],
      validated: null,
    };
  }
  componentDidMount() {
    const accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }
  getUser(token) {
    const username = localStorage.getItem("user");
    axios.get(`https://my-flix-48028.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        this.setState({
          Name: response.data.Name,
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthdate: response.data.Birthdate,
          FavoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // Remove a movie from the users profile
  removeFavoriteMovie(e, movie) {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");
    axios
      .delete(`https://my-flix-48028.herokuapp.com/users/${username}/${movie._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert("The movie has been removed");
        this.componentDidMount();
      })
      .catch((error) => {
        console.log(error);
      })
    // .then(() => window.location.reload());
  }

  handleUpdate(e, newName, newUsername, newPassword, newEmail, newBirthdate) {
    this.setState({
      validated: null,
    });

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({
        validated: true,
      });
      return;
    }
    e.preventDefault();

    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");

    // Update user profile information
    axios.put(`https://my-flix-48028.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        Name: newName ? newName : this.state.Name,
        Username: newUsername ? newUsername : this.state.Username,
        Password: newPassword ? newPassword : this.state.Password,
        Email: newEmail ? newEmail : this.state.Email,
        Birthdate: newBirthdate ? newBirthdate : this.state.Birthdate,
      },
    })
      .then((response) => {
        alert("Saved changes");
        this.setState({
          Name: response.data.Name,
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthdate: response.data.Birthdate,
        });
        localStorage.setItem("user", this.state.Username);
        window.open(`/users/${username}`, "_self");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  setName(input) {
    this.Name = input;
  }
  setUsername(input) {
    this.Username = input;
  }
  setPassword(input) {
    this.Password = input;
  }
  setEmail(input) {
    this.Email = input;
  }
  setBirthdate(input) {
    this.Birthdate = input;
  }
  handleDeleteUser = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");


    // Delete user profile
    axios.delete(`https://my-flix-48028.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        alert("Your account has been deleted.");
        window.open(`/`, "_self");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { FavoriteMovies, validated } = this.state;
    const { movies } = this.props;

    return (
      <Row className="profile-view">
        <Card className="profile-card">
          <h2 className="first-header">Profile</h2>
          <Card.Body>
            {FavoriteMovies.length === 0 && <div className="text-center">Favorite movies: empty</div>}
            <div className="favorites-movies ">
              {FavoriteMovies.length > 0 &&
                FavoriteMovies.map((movieId) => {
                  const movie = movies.find((favMovie) => favMovie._id === movieId)
                  return (
                    <CardDeck className="movie-card-deck">
                      <Card className="favorites-item card-content" style={{ width: '16rem' }} key={movie._id}>
                        <Card.Img style={{ width: '18rem' }} className="movieCard" variant="top" src={movie.ImagePath} />
                        <Card.Body>
                          <Card.Title className="movie-card-title">{movie.Title}</Card.Title>
                          <Button variant="warning" size="md" value={movie._id} onClick={(e) => this.removeFavoriteMovie(e, movie)}>
                            Remove
                          </Button>
                        </Card.Body>
                      </Card>
                    </CardDeck>
                  );
                })}
            </div>
          </Card.Body>
          <Card.Body>
            <Form noValidate validated={validated} className="update-form" onSubmit={(e) => this.handleUpdate(e, this.Name, this.Username, this.Password, this.Email, this.Birthdate)}>

              <Form.Group controlId="Username">
                <Form.Label className="form-label">Username: </Form.Label>
                <Form.Control type="text" placeholder="Enter username" onChange={(e) => this.setUsername(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="Password">
                <Form.Label className="form-label">
                  Password: <span className="required"></span>
                </Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={(e) => this.setPassword(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="Email">
                <Form.Label className="form-label">Email: </Form.Label>
                <Form.Control type="email" placeholder="Email" onChange={(e) => this.setEmail(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="Birthday">
                <Form.Label className="form-label">Birthdate: </Form.Label>
                <Form.Control type="date" onChange={(e) => this.setBirthdate(e.target.value)} />
              </Form.Group>
              <Card.Body>
                <Button id="btn-update-my-account" variant="warning">
                  Update Profile
                </Button>
                <Button id="btn-delete-my-account" variant="warning" type="submit" onClick={(e) => this.handleDeleteUser(e)}>
                  Delete Account
                </Button>
              </Card.Body>
            </Form>

          </Card.Body>
        </Card>
      </Row >
    );
  }
}

ProfileView.propTypes = {
  users: PropTypes.shape({
    FavoriteMovies: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
      })
    ),
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthdate: PropTypes.string,
  }),
};