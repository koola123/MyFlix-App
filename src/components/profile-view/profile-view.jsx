import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Button, Card, Form, Row } from "react-bootstrap";

import "./profile-view.scss";

export class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: "",
      Password: "",
      Email: "",
      Birthday: "",
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

  // Get profile user information
  getUser(token) {
    const username = localStorage.getItem("user");
    axios
      .get(`https://my-blockbusters.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        this.setState({
          Username: response.data.Username,
          Email: response.data.Email,
          Birthday: response.data.Birthday.substring(0, 10),
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
      .delete(
        `https://my-blockbusters.herokuapp.com/users/${username}/movies/${movie._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        alert("Movie has been removed");
        this.componentDidMount();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleUpdate(e) {
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
    axios
      .put(
        `https://my-blockbusters.herokuapp.com/users/${username}`,
        {
          Username: this.state.Username,
          Password: this.state.Password,
          Email: this.state.Email,
          Birthday: this.state.Birthday.substring(0, 10),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        alert("Profile has been updated");
        localStorage.setItem("user", this.state.Username);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleDeleteUser = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");

    // Delete user profile
    axios
      .delete(`https://my-blockbusters.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        alert("Your account has been deleted");
        window.open(`/`, "_self");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  setUsername(value) {
    this.setState({
      Username: value,
    });
  }

  setPassword(value) {
    this.setState({
      Password: value,
    });
  }

  setEmail(value) {
    this.setState({
      Email: value,
    });
  }

  setBirthday(value) {
    this.setState({
      Birthday: value,
    });
  }

  render() {
    const { movies } = this.props;
    const { FavoriteMovies, validated } = this.state;
    return (
      <Row className="profile-view justify-content-md-center">
        {/* Profile View */}
        <Card className="profile-card">
          <h1 className="profile-title">Profile View</h1>
          <Form
            noValidate
            validated={validated}
            className="update-form"
            onSubmit={(e) =>
              this.handleUpdate(
                e,
                this.state.Username,
                this.state.Password,
                this.state.Email,
                this.state.Birthday
              )
            }
          >
            <Form.Group controlId="Username">
              <Form.Control
                type="text"
                size="md"
                placeholder="Username"
                value={this.state.Username}
                required
                onChange={(e) => this.setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="Password">
              <Form.Control
                type="password"
                size="md"
                placeholder="Password"
                value={this.state.Password}
                required
                onChange={(e) => this.setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="Email">
              <Form.Control
                type="email"
                size="md"
                placeholder="Email"
                value={this.state.Email}
                required
                onChange={(e) => this.setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="Birthday">
              <Form.Control
                type="date"
                size="md"
                value={this.state.Birthday}
                onChange={(e) => this.setBirthday(e.target.value)}
              />
            </Form.Group>
            <Button id="btn-update-my-account" variant="primary" type="submit">
              Update Profile
            </Button>
            <Button
              id="btn-delete-my-account"
              variant="secondary"
              onClick={(e) => this.handleDeleteUser(e)}
            >
              Delete Account
            </Button>
          </Form>
          {/* Favorite Movies */}
          <React.Fragment>
            <h1 className="favorite-movies-title">Favorite Movies:</h1>
            <Card className="d-flex favorites-movies ">
              {FavoriteMovies.length > -1 &&
                FavoriteMovies.map((movieId) => {
                  const movie = movies.find(
                    (favMovie) => favMovie._id === movieId
                  );
                  if (movie) {
                    return (
                      <Card style={{ width: "18rem" }} key={movieId}>
                        <Card.Img variant="top" />
                        <Card.Body>
                          <Card.Title className="movie-card-title">
                            {movie.Title}
                          </Card.Title>
                        </Card.Body>
                        <Button
                          variant="secondary"
                          size="sm"
                          value={movie._id}
                          onClick={(e) => this.removeFavoriteMovie(e, movie)}
                        >
                          Remove
                        </Button>
                      </Card>
                    );
                  } else {
                    return "The list is empty."
                  }
                })}
            </Card>
          </React.Fragment>
        </Card>
      </Row>
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
    Birthday: PropTypes.string,
  }),
};
